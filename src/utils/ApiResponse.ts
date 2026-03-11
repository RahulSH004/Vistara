export class ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
  
    constructor(data: T | null, error: string | null = null) {
      this.success = error === null;
      this.data = data;
      this.error = error;
    }
}