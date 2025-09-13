import { createReducer } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from './orders.models';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState extends EntityState<Order> { }

export const ordersAdapter = createEntityAdapter<Order>({
    selectId: (o) => o.id,
    sortComparer: false,
});

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState({});

export const ordersReducer = createReducer(initialOrdersState);
