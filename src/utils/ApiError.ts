export class ApiError extends Error {
    constructor(
        public statuscode: number,

        message : string
    ){
        super(message),
        this.statuscode = statuscode
        this.message = message
        this.name = 'ApiError'
    }
}