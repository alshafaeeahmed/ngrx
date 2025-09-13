import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order } from './orders.models';
import { MOCK_ORDERS } from '../shared/mock-data/orders.mock';
import { API_CONFIG } from '../shared/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    /**
     * Simulates an API call to fetch orders.
     * In production, this would make an HTTP request to the backend.
     * Note: userId values should match existing users (1-9).
     */
    getOrders(): Observable<Order[]> {
        return of(MOCK_ORDERS).pipe(delay(API_CONFIG.DELAYS.ORDERS));
        // Real world:
        // return this.http.get<Order[]>(API_CONFIG.ENDPOINTS.ORDERS);
    }
}
