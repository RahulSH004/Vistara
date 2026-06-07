export class ApiResponse {
    success;
    data;
    error;
    constructor(data, error = null) {
        this.success = error === null;
        this.data = data;
        this.error = error;
    }
}
//# sourceMappingURL=ApiResponse.js.map