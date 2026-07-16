export interface User {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "CEO" | "Manager" | "Staff";
  avatarUrl?: string;
  companyName: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
}

export interface MetricSummary {
  label: string;
  value: number;
  change: number;
  format: "currency" | "number" | "percent";
}

export interface Customer {
  id: string;
  name: string;
  type: "Company" | "Individual";
  industry: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive" | "Lead";
  tags: string[];
  totalDeals: number;
  totalValue: number;
  wonDeals: number;
  lastContact: string;
  customerSince: string;
}

export interface Deal {
  id: string;
  customerId: string;
  title: string;
  stage: "Lead" | "Qualified" | "Proposal Sent" | "Negotiation" | "Won" | "Lost";
  value: number;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: "In Progress" | "Review" | "Completed" | "At Risk";
}

export type TaskStatus = "To Do" | "In Progress" | "Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  tag: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee?: { name: string; avatarUrl?: string };
}

export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
}

export interface ActivityItem {
  id: string;
  type: "email" | "call" | "note" | "meeting" | "system";
  title: string;
  description: string;
  author: string;
  timestamp: string;
  status?: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
}
