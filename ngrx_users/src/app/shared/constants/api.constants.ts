/**
 * API configuration constants
 */
export const API_CONFIG = {
    DELAYS: {
        USERS: 600,
        ORDERS: 400,
    },
    ENDPOINTS: {
        USERS: '/api/users',
        ORDERS: '/api/orders',
    },
} as const;
