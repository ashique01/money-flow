import type { ApiResponse } from "@/types/api";

class ApiClient {
  private readonly baseUrl = "/api";
  private createUrl(action: string, params: Record<string, string> = {}) {
    const url = new URL(`${this.baseUrl}`, window.location.origin);

    url.searchParams.set("action", action);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return url;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const json: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(json.message || `HTTP ${response.status}`);
    }

    if (!json.success) {
      throw new Error(json.message || "Unknown API Error");
    }

    return json.data;
  }

  async get<T>(
    action: string,
    params: Record<string, string> = {},
  ): Promise<T> {
    const response = await fetch(this.createUrl(action, params), {
      method: "GET",

      cache: "no-store",

      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.parseResponse<T>(response);
  }

  async post<T>(action: string, body: object): Promise<T> {
    const response = await fetch(this.createUrl(action), {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    return this.parseResponse<T>(response);
  }
}

export const api = new ApiClient();
