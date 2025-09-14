import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from './orders.models';
import {
    loadOrders,
    loadOrdersSuccess,
    loadOrdersFailure,
} from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState extends EntityState<Order> { }

export const ordersAdapter = createEntityAdapter<Order>({
    selectId: (o) => o.id,
    sortComparer: false,
});

export const initialOrdersState: OrdersState =
    ordersAdapter.getInitialState({});
export const ordersReducer = createReducer(
    initialOrdersState,

    on(loadOrders, (state) => state),

    on(loadOrdersSuccess, (state, { orders }) => {
        const next = ordersAdapter.setAll(orders, state);
        console.log('[Reducer][Orders] setAll -> ids:', next.ids);
        return next;
    }),

    on(loadOrdersFailure, (state, { error }) => {
        console.error('[Reducer][Orders] load failure:', error);
        return state;
    })
);
