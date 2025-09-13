import { ApiError } from '../types/api.types';

/**
 * Utility functions for error handling
 */
export class ErrorHandlerUtil {
    /**
     * Creates a standardized API error object
     */
    static createApiError(message: string, code?: string, details?: unknown): ApiError {
        return {
            message,
            code,
            details,
        };
    }

    /**
     * Logs error to console with context
     */
    static logError(context: string, error: unknown): void {
        console.error(`[${context}] Error:`, error);
    }

    /**
     * Handles HTTP errors and converts to ApiError
     */
    static handleHttpError(error: any): ApiError {
        if (error?.error?.message) {
            return this.createApiError(error.error.message, error.status?.toString());
        }

        if (error?.message) {
            return this.createApiError(error.message);
        }

        return this.createApiError('An unexpected error occurred');
    }
}
