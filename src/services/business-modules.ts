export interface LeadRecord {
  id: string;
  name: string;
  company: string;
  stage: string;
  owner: string;
  value: number;
  nextStep: string;
  status: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  status: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  industry: string;
  revenue: string;
  owner: string;
  status: string;
}

export interface OpportunityRecord {
  id: string;
  name: string;
  value: number;
  probability: number;
  owner: string;
  stage: string;
}

export interface ActivityRecord {
  id: string;
  title: string;
  type: string;
  owner: string;
  timestamp: string;
  status: string;
}

export interface NoteRecord {
  id: string;
  title: string;
  owner: string;
  summary: string;
  relatedTo: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface QuoteRecord {
  id: string;
  quoteNo: string;
  customer: string;
  amount: number;
  validUntil: string;
  status: string;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  customer: string;
  amount: number;
  method: string;
  status: string;
}

export interface ExpenseRecord {
  id: string;
  title: string;
  category: string;
  amount: number;
  owner: string;
  status: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  progress: number;
  owner: string;
  dueDate: string;
  status: string;
}

export interface MilestoneRecord {
  id: string;
  title: string;
  dueDate: string;
  owner: string;
  status: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: string;
}

export interface AttendanceRecord {
  id: string;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

export interface LeaveRecord {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface PayrollRecord {
  id: string;
  employee: string;
  period: string;
  grossPay: number;
  netPay: number;
  status: string;
}

export interface InventoryProductRecord {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: string;
}

export interface InventoryServiceRecord {
  id: string;
  name: string;
  category: string;
  rate: number;
  availability: string;
  status: string;
}

export interface MarketingRecord {
  id: string;
  name: string;
  channel: string;
  owner: string;
  reach: string;
  status: string;
}

export interface CommunicationRecord {
  id: string;
  sender: string;
  subject: string;
  channel: string;
  receivedAt: string;
  status: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  lastActive: string;
  status: string;
}

export interface AIAgentRecord {
  id: string;
  name: string;
  purpose: string;
  owner: string;
  status: string;
}

export const crmLeads: LeadRecord[] = [
  { id: "lead-1", name: "Amina Yusuf", company: "Northstar Labs", stage: "Qualified", owner: "Ada", value: 3200000, nextStep: "Demo scheduled", status: "Hot" },
  { id: "lead-2", name: "Daniel Okafor", company: "BluePeak", stage: "Proposal", owner: "Mina", value: 1750000, nextStep: "Review pricing", status: "Warm" },
  { id: "lead-3", name: "Rita Adebayo", company: "Helix Retail", stage: "Discovery", owner: "Ife", value: 890000, nextStep: "Follow-up call", status: "Cold" },
];

export const crmContacts: ContactRecord[] = [
  { id: "contact-1", name: "Amina Yusuf", role: "COO", company: "Northstar Labs", email: "amina@northstar.dev", status: "Engaged" },
  { id: "contact-2", name: "Daniel Okafor", role: "Head of Ops", company: "BluePeak", email: "daniel@bluepeak.io", status: "New" },
];

export const crmCompanies: CompanyRecord[] = [
  { id: "company-1", name: "Northstar Labs", industry: "SaaS", revenue: "₦18M", owner: "Ada", status: "Active" },
  { id: "company-2", name: "BluePeak", industry: "Retail", revenue: "₦9M", owner: "Mina", status: "Growing" },
];

export const crmOpportunities: OpportunityRecord[] = [
  { id: "opp-1", name: "AI Copilot rollout", value: 4800000, probability: 72, owner: "Ada", stage: "Negotiation" },
  { id: "opp-2", name: "Finance dashboard upgrade", value: 2400000, probability: 54, owner: "Mina", stage: "Proposal" },
];

export const crmActivities: ActivityRecord[] = [
  { id: "activity-1", title: "Discovery call completed", type: "Call", owner: "Ada", timestamp: "Today • 10:30", status: "Completed" },
  { id: "activity-2", title: "Proposal shared", type: "Email", owner: "Ife", timestamp: "Yesterday", status: "Sent" },
];

export const crmNotes: NoteRecord[] = [
  { id: "note-1", title: "Budget concern", owner: "Ada", summary: "Client is price-sensitive but wants implementation support.", relatedTo: "Northstar Labs" },
];

export const financeInvoices: InvoiceRecord[] = [
  { id: "inv-1", invoiceNo: "INV-2401", customer: "Northstar Labs", amount: 1800000, dueDate: "2026-08-01", status: "Paid" },
  { id: "inv-2", invoiceNo: "INV-2402", customer: "BluePeak", amount: 950000, dueDate: "2026-08-15", status: "Pending" },
];

export const financeQuotes: QuoteRecord[] = [
  { id: "quote-1", quoteNo: "Q-1001", customer: "Northstar Labs", amount: 2800000, validUntil: "2026-08-10", status: "Approved" },
  { id: "quote-2", quoteNo: "Q-1002", customer: "Helix Retail", amount: 1170000, validUntil: "2026-08-20", status: "Draft" },
];

export const financePayments: PaymentRecord[] = [
  { id: "pay-1", reference: "PMT-998", customer: "Northstar Labs", amount: 1800000, method: "Bank Transfer", status: "Completed" },
  { id: "pay-2", reference: "PMT-999", customer: "BluePeak", amount: 500000, method: "Card", status: "Pending" },
];

export const financeExpenses: ExpenseRecord[] = [
  { id: "exp-1", title: "Cloud infrastructure", category: "Operations", amount: 540000, owner: "Ife", status: "Approved" },
  { id: "exp-2", title: "Design sprint", category: "Product", amount: 320000, owner: "Mina", status: "Review" },
];

export const projectItems: ProjectRecord[] = [
  { id: "project-1", name: "AI Operations rollout", progress: 74, owner: "Ada", dueDate: "2026-09-05", status: "In Progress" },
  { id: "project-2", name: "Client onboarding automation", progress: 52, owner: "Mina", dueDate: "2026-09-18", status: "Planning" },
];

export const projectMilestones: MilestoneRecord[] = [
  { id: "milestone-1", title: "Requirements sign-off", dueDate: "2026-07-30", owner: "Ada", status: "On Track" },
  { id: "milestone-2", title: "Pilot launch", dueDate: "2026-08-12", owner: "Mina", status: "At Risk" },
];

export const hrEmployees: EmployeeRecord[] = [
  { id: "emp-1", name: "Ada Okafor", role: "PM", department: "Product", location: "Lagos", status: "Active" },
  { id: "emp-2", name: "Mina Bello", role: "Sales Lead", department: "Revenue", location: "Abuja", status: "Active" },
];

export const hrAttendance: AttendanceRecord[] = [
  { id: "att-1", employee: "Ada Okafor", date: "2026-07-15", checkIn: "08:20", checkOut: "17:30", status: "Present" },
  { id: "att-2", employee: "Mina Bello", date: "2026-07-15", checkIn: "08:40", checkOut: "17:10", status: "Late" },
];

export const hrLeave: LeaveRecord[] = [
  { id: "leave-1", employee: "Ada Okafor", type: "Annual", startDate: "2026-07-22", endDate: "2026-07-24", status: "Approved" },
];

export const hrPayroll: PayrollRecord[] = [
  { id: "payroll-1", employee: "Ada Okafor", period: "July 2026", grossPay: 620000, netPay: 510000, status: "Processed" },
];

export const inventoryProducts: InventoryProductRecord[] = [
  { id: "product-1", name: "AI Copilot Suite", category: "Software", stock: 120, price: 390000, status: "In Stock" },
  { id: "product-2", name: "Ops Dashboard", category: "Software", stock: 42, price: 220000, status: "Low" },
];

export const inventoryServices: InventoryServiceRecord[] = [
  { id: "service-1", name: "Implementation Support", category: "Professional", rate: 180000, availability: "Available", status: "Live" },
];

export const inventoryCategories = [
  { id: "cat-1", name: "Software", count: 14, status: "Active" },
  { id: "cat-2", name: "Professional Services", count: 6, status: "Active" },
];

export const inventoryStock = [
  { id: "stock-1", sku: "AI-001", name: "AI Copilot Suite", quantity: 120, location: "Lagos", status: "Healthy" },
];

export const inventorySuppliers = [
  { id: "supplier-1", name: "CloudForge", contact: "Grace", status: "Preferred" },
];

export const marketingItems: MarketingRecord[] = [
  { id: "marketing-1", name: "Q3 Product Launch", channel: "Email", owner: "Mina", reach: "26K", status: "Running" },
  { id: "marketing-2", name: "LinkedIn Thought Leadership", channel: "Social", owner: "Rita", reach: "18K", status: "Draft" },
];

export const communicationItems: CommunicationRecord[] = [
  { id: "comm-1", sender: "Northstar Labs", subject: "Implementation kickoff", channel: "Email", receivedAt: "Today", status: "Unread" },
  { id: "comm-2", sender: "Ops Team", subject: "Invoice reminder", channel: "SMS", receivedAt: "Yesterday", status: "Read" },
];

export const adminUsers: AdminUserRecord[] = [
  { id: "user-1", name: "Ada Okafor", role: "Admin", email: "ada@example.com", lastActive: "5m ago", status: "Active" },
  { id: "user-2", name: "Mina Bello", role: "Manager", email: "mina@example.com", lastActive: "1h ago", status: "Active" },
];

export const aiAgents: AIAgentRecord[] = [
  { id: "agent-1", name: "Revenue Analyst", purpose: "Spot growth opportunities", owner: "Ada", status: "Online" },
  { id: "agent-2", name: "Ops Coach", purpose: "Automate follow-ups", owner: "Mina", status: "Learning" },
];

export const aiHistory = [
  { id: "history-1", title: "Revenue discovery", summary: "Summarized performance and opportunities.", owner: "AI", status: "Completed" },
];

export const aiKnowledgeBase = [
  { id: "kb-1", title: "Pricing Handbook", summary: "Approved pricing guidance for enterprise deals.", owner: "Ops", status: "Published" },
];

export const aiPrompts = [
  { id: "prompt-1", title: "Executive weekly summary", summary: "Creates a concise leadership report from CRM and finance updates.", owner: "Ada", status: "Active" },
];
