import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order } from './orders.models';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    /** Simulated API; ensure userId matches your users 1..9 */
    getOrders(): Observable<Order[]> {
        const mock: Order[] = [
            { id: 101, userId: 1, total: 120 },
            { id: 102, userId: 1, total: 80 },
            { id: 201, userId: 2, total: 50 },
            { id: 202, userId: 2, total: 30 },
            { id: 301, userId: 3, total: 75 },
        ];
        return of(mock).pipe(delay(400));
    }
}
