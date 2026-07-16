import type { Customer, Deal, Project, Task, Invoice, ActivityItem, AIRecommendation } from "@/types";

export const mockUser = {
  id: "u1",
  name: "John CEO",
  email: "john@techflowsolutions.com",
  role: "CEO" as const,
  companyName: "TechFlow Solutions Ltd.",
};

export const revenueSeries = [
  { date: "May 1", revenue: 14_000_000, profit: 8_000_000 },
  { date: "May 8", revenue: 17_500_000, profit: 9_500_000 },
  { date: "May 15", revenue: 16_200_000, profit: 9_000_000 },
  { date: "May 22", revenue: 21_000_000, profit: 12_000_000 },
  { date: "May 29", revenue: 24_500_000, profit: 16_300_000 },
];

export const sparkline = (base: number, volatility = 0.15) =>
  Array.from({ length: 8 }, (_, i) => ({
    v: Math.round(base * (1 + (Math.sin(i) * volatility) + i * 0.02)),
  }));

export const taskDonut = [
  { name: "Completed", value: 42, color: "#10B981" },
  { name: "In Progress", value: 18, color: "#4F46E5" },
  { name: "Review", value: 7, color: "#F59E0B" },
  { name: "Pending", value: 5, color: "#94A3B8" },
];

export const revenueBySource = [
  { name: "Software Services", value: 45, amount: 11_000_000, color: "#4F46E5" },
  { name: "Consulting", value: 29, amount: 6_100_000, color: "#F59E0B" },
  { name: "Support & Maintenance", value: 15, amount: 3_700_000, color: "#10B981" },
  { name: "Other", value: 11, amount: 2_700_000, color: "#94A3B8" },
];

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "TechFlow Solutions Ltd.",
    type: "Company",
    industry: "Software Development",
    email: "hello@techflowsolutions.com",
    phone: "+234 812 345 6789",
    address: "123 Innovation Drive, Victoria Island, Lagos, Nigeria",
    status: "Active",
    tags: ["High Value", "Active", "Enterprise", "Repeat Customer"],
    totalDeals: 7,
    totalValue: 24_800_000,
    wonDeals: 3,
    lastContact: "2025-05-24",
    customerSince: "2024-03-12",
  },
  {
    id: "c2",
    name: "Greenfield Industries",
    type: "Company",
    industry: "Manufacturing",
    email: "contact@greenfield.com",
    phone: "+234 803 111 2222",
    address: "45 Industrial Ave, Ikeja, Lagos",
    status: "Active",
    tags: ["Active"],
    totalDeals: 4,
    totalValue: 5_200_000,
    wonDeals: 2,
    lastContact: "2025-05-20",
    customerSince: "2024-08-01",
  },
  {
    id: "c3",
    name: "Innovate Ltd.",
    type: "Company",
    industry: "Fintech",
    email: "hello@innovate.ng",
    phone: "+234 701 555 9090",
    address: "9 Broad Street, Lagos Island",
    status: "Lead",
    tags: ["Lead"],
    totalDeals: 1,
    totalValue: 3_700_000,
    wonDeals: 0,
    lastContact: "2025-05-18",
    customerSince: "2025-04-02",
  },
];

export const mockDeals: Deal[] = [
  { id: "d1", customerId: "c1", title: "Lead", stage: "Lead", value: 2_500_000 },
  { id: "d2", customerId: "c1", title: "Qualified", stage: "Qualified", value: 2_500_000 },
  { id: "d3", customerId: "c1", title: "Proposal Sent", stage: "Proposal Sent", value: 2_500_000 },
  { id: "d4", customerId: "c1", title: "Negotiation", stage: "Negotiation", value: 2_500_000 },
  { id: "d5", customerId: "c1", title: "Won", stage: "Won", value: 2_500_000 },
];

export const mockProjects: Project[] = [
  { id: "p1", name: "Website Redesign", progress: 75, status: "In Progress" },
  { id: "p2", name: "Mobile App Development", progress: 60, status: "In Progress" },
  { id: "p3", name: "Brand Identity Design", progress: 90, status: "Review" },
  { id: "p4", name: "Digital Marketing Campaign", progress: 100, status: "Completed" },
];

export const mockTasks: Task[] = [
  { id: "t1", title: "Research AI integration platforms", tag: "Research", status: "To Do", priority: "Medium", dueDate: "2025-05-28" },
  { id: "t2", title: "Prepare proposal for TechFlow Solutions", tag: "Proposal", status: "To Do", priority: "High", dueDate: "2025-05-29" },
  { id: "t3", title: "Design new dashboard wireframes", tag: "Design", status: "To Do", priority: "Medium", dueDate: "2025-05-30" },
  { id: "t4", title: "Review Q2 marketing performance", tag: "Analytics", status: "To Do", priority: "Low", dueDate: "2025-05-31" },
  { id: "t5", title: "AI Integration Project Development", tag: "Development", status: "In Progress", priority: "High", dueDate: "2025-05-26" },
  { id: "t6", title: "Client Onboarding Automation", tag: "Automation", status: "In Progress", priority: "High", dueDate: "2025-05-27" },
  { id: "t7", title: "Mobile App Testing", tag: "Testing", status: "In Progress", priority: "Medium", dueDate: "2025-05-28" },
  { id: "t8", title: "Content Strategy Planning", tag: "Marketing", status: "In Progress", priority: "Low", dueDate: "2025-05-29" },
  { id: "t9", title: "Review integration architecture", tag: "Review", status: "Review", priority: "High", dueDate: "2025-05-24" },
  { id: "t10", title: "Security audit report", tag: "Security", status: "Review", priority: "Medium", dueDate: "2025-05-25" },
  { id: "t11", title: "UI/UX Design Review", tag: "Design", status: "Review", priority: "Medium", dueDate: "2025-05-26" },
  { id: "t12", title: "Project kickoff meeting", tag: "Meeting", status: "Done", priority: "High", dueDate: "2025-05-20" },
  { id: "t13", title: "Requirements gathering", tag: "Research", status: "Done", priority: "Medium", dueDate: "2025-05-18" },
];

export const mockInvoices: Invoice[] = [
  { id: "INV-2025-056", customerName: "TechFlow Solutions Ltd.", amount: 2_500_000, status: "Paid", dueDate: "2025-05-20" },
  { id: "INV-2025-057", customerName: "Greenfield Industries", amount: 1_200_000, status: "Pending", dueDate: "2025-06-05" },
  { id: "INV-2025-058", customerName: "Innovate Ltd.", amount: 3_700_000, status: "Overdue", dueDate: "2025-05-10" },
];

export const mockActivity: ActivityItem[] = [
  { id: "a1", type: "email", title: "Email sent", description: "Sent proposal for AI Integration Project", author: "John CEO", timestamp: "2025-05-24T10:30:00" },
  { id: "a2", type: "call", title: "Phone call", description: "Discussed project requirements and timeline", author: "Sarah Johnson", timestamp: "2025-05-22T14:15:00" },
  { id: "a3", type: "note", title: "Note added", description: "Client interested in expanding to additional modules", author: "John CEO", timestamp: "2025-05-20T11:45:00" },
  { id: "a4", type: "meeting", title: "Meeting", description: "Project kickoff meeting", author: "John CEO", timestamp: "2025-05-18T10:00:00" },
  { id: "a5", type: "system", title: "Deal stage changed", description: "AI Integration Project moved to Proposal Sent", author: "System", timestamp: "2025-05-17T09:20:00" },
];

export const mockRecommendations: AIRecommendation[] = [
  { id: "r1", title: "Increase Marketing Budget", description: "Increase budget by 15% to boost lead generation.", impact: "Potential revenue increase: ₦3.2M" },
  { id: "r2", title: "Focus on High-Value Clients", description: "Target enterprise clients in your network.", impact: "Potential revenue increase: ₦2.7M" },
  { id: "r3", title: "Optimize Service Pricing", description: "Review and adjust pricing for high-demand services.", impact: "Potential revenue increase: ₦1.8M" },
];
