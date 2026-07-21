import { env } from "@/lib/env";

export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string>;

  constructor(message: string, status: number, code = "unknown_error", fields?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip the `Content-Type: application/json` header (e.g. for FormData uploads). */
  raw?: boolean;
}

/**
 * Thin wrapper around fetch() that:
 *  - prefixes every call with NEXT_PUBLIC_API_BASE_URL
 *  - sends cookies (credentials: "include") so the real backend's httpOnly
 *    session cookie is attached automatically once auth is wired up
 *  - JSON-encodes the body and parses JSON responses
 *  - throws a typed ApiError with the backend's error code/message on failure
 *
 * Every function in src/services/api/*.ts should go through this instead of
 * calling fetch() directly, so retry/auth/error behavior stays consistent
 * in exactly one place.
 */
export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, raw, headers, ...rest } = options;

  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(raw ? {} : { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...headers,
    },
    body: body !== undefined ? (raw ? (body as BodyInit) : JSON.stringify(body)) : undefined,
  });

  let payload: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      // Non-JSON response body — leave payload as null, handled below.
    }
  }

  if (!res.ok) {
    const errBody = payload as { error?: { code?: string; message?: string; fields?: Record<string, string> } } | null;
    throw new ApiError(
      errBody?.error?.message ?? res.statusText ?? "Request failed",
      res.status,
      errBody?.error?.code ?? "unknown_error",
      errBody?.error?.fields
    );
  }

  // Supports both a raw-data API and one that wraps responses as { success, data }.
  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}
