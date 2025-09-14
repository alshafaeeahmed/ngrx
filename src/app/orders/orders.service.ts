import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order } from './orders.models';
import { MOCK_ORDERS } from '../shared/mock-data/orders.mock';
import { API_CONFIG } from '../shared/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    getOrders(): Observable<Order[]> {
        return of(MOCK_ORDERS).pipe(delay(API_CONFIG.DELAYS.ORDERS));
    }
}
