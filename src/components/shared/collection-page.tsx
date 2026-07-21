"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface CollectionFilterOption {
  label: string;
  value: string;
}

export interface CollectionSortOption {
  label: string;
  value: string;
}

interface CollectionPageProps<T> {
  title: string;
  subtitle: string;
  items: T[];
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
  filterOptions?: CollectionFilterOption[];
  sortOptions?: CollectionSortOption[];
  getSearchText: (item: T) => string;
  getFilterValue: (item: T) => string;
  getSortValue: (item: T) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
  actions?: React.ReactNode;
  pageSize?: number;
  isLoading?: boolean;
  error?: string;
}

export function CollectionPage<T>({
  title,
  subtitle,
  items,
  searchPlaceholder,
  emptyTitle,
  emptyDescription,
  filterOptions = [],
  sortOptions = [],
  getSearchText,
  getFilterValue,
  getSortValue,
  renderItem,
  actions,
  pageSize = 6,
  isLoading = false,
  error,
}: CollectionPageProps<T>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value ?? "latest");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase();
    const next = items.filter((item) => {
      const matchesSearch = !query || getSearchText(item).toLowerCase().includes(query);
      const matchesFilter = filter === "all" || getFilterValue(item) === filter;
      return matchesSearch && matchesFilter;
    });

    next.sort((left, right) => {
      const leftValue = getSortValue(left);
      const rightValue = getSortValue(right);
      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return leftValue > rightValue ? 1 : -1;
      }
      return String(leftValue).localeCompare(String(rightValue));
    });

    return next;
  }, [filter, getFilterValue, getSearchText, getSortValue, items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <DashboardShell title={title} subtitle={subtitle}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search records"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>
          {filterOptions.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={filter} onValueChange={(value) => {
                setFilter(value);
                setPage(1);
              }}>
                <SelectTrigger className="h-8 w-[140px] border-0 bg-transparent p-0 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {sortOptions.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                setPage(1);
              }}>
                <SelectTrigger className="h-8 w-[160px] border-0 bg-transparent p-0 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {actions}
      </div>

      {error ? (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 text-sm text-destructive">{error}</CardContent>
        </Card>
      ) : null}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="space-y-3 p-5">
                <div className="h-4 w-3/4 rounded bg-secondary" />
                <div className="h-3 w-1/2 rounded bg-secondary" />
                <div className="h-3 w-full rounded bg-secondary" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : pagedItems.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pagedItems.map((item, index) => renderItem(item, index))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(filteredItems.length, (currentPage - 1) * pageSize + 1)}-{Math.min(filteredItems.length, currentPage * pageSize)} of {filteredItems.length} items
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-10 text-center">
            <h3 className="text-lg font-semibold">{emptyTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{emptyDescription}</p>
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  );
}
