/**
 * Types describing the shape of data coming back from the Express API.
 *
 * These are intentionally kept separate from `src/types/index.ts` (the
 * frontend's internal domain models). API responses often differ slightly
 * from what components want to render (e.g. paginated envelopes, snake_case
 * from some backends, nullable fields) — mapping functions in
 * `src/services/api/*` convert between the two. If your backend team's
 * actual response shape differs from what's modeled here, this is the file
 * to update; the rest of the app is insulated from that change by React
 * Query's cached, typed hooks in `src/hooks/`.
 */

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// ---- Auth ----------------------------------------------------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthUserResponse {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "CEO" | "Manager" | "Staff";
  companyName: string;
  avatarUrl?: string;
}

export interface LoginResponse {
  user: AuthUserResponse;
  // The real backend should set this as an httpOnly cookie rather than
  // returning it in the body — keep this field only if your team decides
  // to manage the token client-side instead (not recommended).
  expiresAt?: string;
}

// ---- CRM -------------------------------------------------------------------

export interface CustomerListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: "Active" | "Inactive" | "Lead";
}

// ---- Tasks -----------------------------------------------------------------

export interface CreateTaskRequest {
  title: string;
  status: "To Do" | "In Progress" | "Review" | "Done";
  priority?: "Low" | "Medium" | "High";
  dueDate?: string;
}

export interface UpdateTaskStatusRequest {
  status: "To Do" | "In Progress" | "Review" | "Done";
}

// ---- AI Assistant ------------------------------------------------------------

export interface SendChatMessageRequest {
  content: string;
  conversationId?: string;
}

export interface SendChatMessageResponse {
  id: string;
  role: "assistant";
  content: string;
  timestamp: string;
}

// ---- Reports -----------------------------------------------------------------

export interface DashboardSummaryResponse {
  totalRevenue: number;
  netProfit: number;
  totalExpenses: number;
  activeProjects: number;
  revenueTrend: { date: string; revenue: number; profit: number }[];
  businessHealthScore: number;
}
