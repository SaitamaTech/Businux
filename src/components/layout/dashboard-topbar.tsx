"use client";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationsStore } from "@/store/notifications-store";
import { useSettingsStore } from "@/store/settings-store";
import { initials } from "@/lib/format";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";

export function DashboardTopbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const notifications = useNotificationsStore((s) => s.notifications);
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileNav />
        {title ? (
          <>
            <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">{title}</h1>
            {subtitle && <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p>}
          </>
        ) : (
          <div className="relative hidden w-72 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="global-search" className="sr-only">
              Search customers, tasks, people
            </label>
            <Input id="global-search" placeholder="Search customers, tasks, people..." className="pl-9" />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label={`Notifications, ${unreadCount} unread`}
              className="relative rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notificationsEnabled && unreadCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
              ) : null}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {!notificationsEnabled ? (
                <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
                  Notifications are disabled. Enable them in Settings to receive updates.
                </div>
              ) : notifications.length === 0 ? (
                <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
                  You have no notifications right now.
                </div>
              ) : (
                notifications.map((item) => (
                  <div key={item.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {!item.read && (
                      <button
                        type="button"
                        onClick={() => useNotificationsStore.getState().markAsRead(item.id)}
                        className="mt-3 rounded-md bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
            {notificationsEnabled && notifications.length > 0 ? (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={markAllRead}
                  className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/90"
                >
                  Mark all as read
                </button>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Account menu for ${user?.name ?? "your account"}`}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user ? initials(user.name) : "U"}</AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <User className="h-4 w-4" aria-hidden="true" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" aria-hidden="true" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
