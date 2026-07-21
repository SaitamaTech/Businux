export interface User {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "CEO" | "Manager" | "Staff";
  avatarUrl?: string;
  companyName: string;
  orgId?: string;
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

// Additional domain types for Phase 2 modules
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyId?: string;
  title?: string;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position?: string;
  department?: string;
  hireDate?: string;
}

export interface Product {
  id: string;
  name: string;
  sku?: string;
  price: number;
  stock: number;
  category?: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "email" | "sms" | "social" | "other";
  status: "draft" | "running" | "paused" | "completed";
  startDate?: string;
  endDate?: string;
}

export interface MessageItem {
  id: string;
  from: string;
  to: string;
  subject?: string;
  body: string;
  timestamp: string;
  read?: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface ApiKey {
  id: string;
  key: string;
  name?: string;
  createdAt: string;
  revoked?: boolean;
}
