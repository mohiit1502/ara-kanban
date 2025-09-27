export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface RequestOptions {
  url: string
  method?: HttpMethod
  body?: any
  headers?: Record<string, string>
  [key: string]: any
}

class Network {
  static defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: "Bearer testtoken",
  }

  static async request<T = any>(options: RequestOptions): Promise<T> {
    const { url, method = "GET", body, headers, ...rest } = options
    const mergedHeaders = {
      ...Network.defaultHeaders,
      ...(headers || {}),
    }
    try {
      const response = await fetch(url, {
        method,
        headers: mergedHeaders,
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.stringify(body),
        ...rest,
      })
      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ message: response.statusText }))
        throw new Error(error.message || "API error")
      }
      return response.json()
    } catch (err: any) {
      throw new Error(err.message || "Network error")
    }
  }

  static get<T = any>(
    url: string,
    options: Omit<RequestOptions, "url" | "method" | "body"> = {},
  ) {
    return Network.request<T>({ url, method: "GET", ...options })
  }

  static post<T = any>(
    url: string,
    body?: any,
    options: Omit<RequestOptions, "url" | "method" | "body"> = {},
  ) {
    return Network.request<T>({ url, method: "POST", body, ...options })
  }

  static put<T = any>(
    url: string,
    body?: any,
    options: Omit<RequestOptions, "url" | "method" | "body"> = {},
  ) {
    return Network.request<T>({ url, method: "PUT", body, ...options })
  }

  static delete<T = any>(
    url: string,
    options: Omit<RequestOptions, "url" | "method" | "body"> = {},
  ) {
    return Network.request<T>({ url, method: "DELETE", ...options })
  }
}

export default Network
