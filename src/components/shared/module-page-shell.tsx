"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CollectionPage, type CollectionFilterOption, type CollectionSortOption } from "@/components/shared/collection-page";
import { CreateItemDialog, type DialogField } from "@/components/shared/create-item-dialog";

interface StatCard {
  label: string;
  value: string;
  detail: string;
}

interface ModulePageShellProps<T> {
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
  renderItem: (item: T, index: number) => ReactNode;
  stats?: StatCard[];
  createTitle?: string;
  createDescription?: string;
  createTriggerLabel?: string;
  createFields?: DialogField[];
  onCreate?: (values: Record<string, string>) => Promise<void> | void;
  isLoading?: boolean;
  error?: string;
}

export function ModulePageShell<T>({
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
  stats,
  createTitle,
  createDescription,
  createTriggerLabel,
  createFields,
  onCreate,
  isLoading = false,
  error,
}: ModulePageShellProps<T>) {
  return (
    <div className="space-y-6">
      {stats && stats.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <CollectionPage
        title={title}
        subtitle={subtitle}
        items={items}
        searchPlaceholder={searchPlaceholder}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        getSearchText={getSearchText}
        getFilterValue={getFilterValue}
        getSortValue={getSortValue}
        isLoading={isLoading}
        error={error}
        actions={
          createTitle && createDescription && createTriggerLabel && createFields && onCreate ? (
            <CreateItemDialog
              triggerLabel={createTriggerLabel}
              title={createTitle}
              description={createDescription}
              fields={createFields}
              onSubmit={onCreate}
            />
          ) : null
        }
        renderItem={renderItem}
      />
    </div>
  );
}
