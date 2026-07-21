import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  CheckSquare,
  Users,
  UserCog,
  Wallet,
  FileBarChart,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
}

export const sidebarNav: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  {
    label: "Tasks & Workflows",
    href: "/tasks",
    icon: CheckSquare,
    children: [
      { label: "Task Board", href: "/tasks" },
      { label: "My Tasks", href: "/tasks?view=mine" },
      { label: "Workflows", href: "/tasks?view=workflows" },
    ],
  },
  {
    label: "CRM",
    href: "/crm/customers",
    icon: Users,
    children: [
      { label: "Customers", href: "/crm/customers" },
      { label: "Leads", href: "/crm/leads" },
      { label: "Deals", href: "/crm/deals" },
    ],
  },
  { label: "Team", href: "/team", icon: UserCog },
  { label: "Finance", href: "/finance", icon: Wallet },
  { label: "Reports & Analytics", href: "/reports", icon: FileBarChart },
  { label: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { label: "Settings", href: "/settings", icon: Settings },
];
