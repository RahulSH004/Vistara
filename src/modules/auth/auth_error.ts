
export class AppError extends Error {
    constructor(public code: string, public statusCode: number){
        super(code);
    }
}

export function handleError(error: Error, data: null){
   if(error instanceof AppError){
    return {
        statusCode: error.statusCode,
        success: false,
        data: null,
        message: error.message,
    }
} else {
    return {
        statusCode: 500,
        success: false,
        data: null,
        message: error.message,
        };
    }
    
}
