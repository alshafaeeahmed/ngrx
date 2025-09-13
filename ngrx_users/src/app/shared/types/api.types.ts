/**
 * Common API response types
 */
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

/**
 * User selection types
 */
export type UserId = number | null;

/**
 * Order summary types
 */
export interface UserOrderSummary {
    userName: string | null;
    totalOrders: number;
}
