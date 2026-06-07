export class ApiError extends Error {
    statuscode;
    constructor(statuscode, message) {
        this.statuscode = statuscode;
        super(message),
            this.statuscode = statuscode;
        this.message = message;
        this.name = 'ApiError';
    }
}
//# sourceMappingURL=ApiError.js.map