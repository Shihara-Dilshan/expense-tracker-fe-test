import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, defaultConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      ...defaultConfig,
    });

    // Optional: request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // e.g., attach auth token
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Optional: response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => Promise.reject(error),
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config);
  }

  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request<T>(config);
  }
}

// Singleton instance
export const api = new HttpService('https://expense-tracker-be-20766818f070.herokuapp.com/api/v1', { //NOTE:: should not be hardcoded 
  headers: { 'Content-Type': 'application/json' },
});
