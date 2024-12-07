/**
 * 애플리케이션 백엔드 서버와 통신하기 위한 Service class입니다.
 *
 * HTTPInstance 인터페이스를 기반으로 다양한 HTTP 요청 메서드를 제공하며,
 * 각 메서드는 HTTP 요청을 수행하고 JSON 형식의 응답 데이터를 반환합니다.
 *
 * Service 클래스는 상속받아 사용할 수 있으며, 기본적으로 fetch를 활용하여
 * HTTP 요청을 처리합니다. API 호출에 필요한 기본 URL과 헤더 설정을 포함하고 있으며,
 * 요청마다 추가 설정을 적용할 수도 있습니다.
 *
 * 사용 예:
 * const service = new Service();
 * const data = await service.http.get('/endpoint');
 */

import { backendUrl } from "@/constants/environments";

interface HTTPInstance {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  constructor() {
    this.baseURL = backendUrl + "/api";
    this.headers = {
      csrf: "token",
      Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }

  /**
   * HTTP 요청을 수행하는 내부 메서드입니다.
   * @param method HTTP 메서드 (GET, POST 등)
   * @param url 요청할 API의 URL 경로
   * @param data 요청에 포함할 데이터 (POST, PUT, PATCH용)
   * @param config fetch 옵션
   * @returns Promise로 응답 데이터를 반환
   */
  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(this.baseURL + url, {
        method,
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: T = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  private get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }

  private delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  private head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("HEAD", url, undefined, config);
  }

  private options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("OPTIONS", url, undefined, config);
  }

  private post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>("POST", url, data, config);
  }

  private put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>("PUT", url, data, config);
  }

  private patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>("PATCH", url, data, config);
  }
}

export default Service;
