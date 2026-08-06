interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apishivom.visital.co.in';
const REVALIDATE_SECONDS = 300;

type ApiRequestConfig = {
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | null | undefined>;
};

type ApiResponse<T> = {
  data: T;
};

const buildUrl = (path: string, params?: ApiRequestConfig['params']) => {
  const url = new URL(path, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

const createApiError = async (response: Response): Promise<ApiError> => {
  let data: unknown;

  try {
    data = await response.json();
  } catch {
    data = await response.text().catch(() => undefined);
  }

  const message =
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
      ? data.message
      : response.statusText || 'An unexpected API error occurred.';

  const error = new Error(message) as ApiError;
  error.status = response.status;
  error.data = data;

  if (process.env.NODE_ENV === 'development') {
    console.error('[API Error]:', response.status, data);
  }

  return error;
};

const apiFetch = async <T>(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> => {
  const headers = new Headers(config.headers);
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (!headers.has('Content-Type') && !isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (isFormData) {
    headers.delete('Content-Type');
  }

  const url = buildUrl(path, config.params);

  if (process.env.NODE_ENV === 'development' && path.includes('/api/public/')) {
    console.log(`[API Request]: ${method} ${path}`, config.params);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'POST' ? (isFormData ? body : JSON.stringify(body ?? {})) : undefined,
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  return {
    data: (await response.json()) as T,
  };
};

export const apiClient = {
  get: <T>(path: string, config?: ApiRequestConfig) => apiFetch<T>('GET', path, undefined, config),
  post: <T = unknown>(path: string, body?: unknown, config?: ApiRequestConfig) =>
    apiFetch<T>('POST', path, body, config),
};
