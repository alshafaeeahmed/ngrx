import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { ORDERS_FEATURE_KEY, OrdersState, ordersAdapter } from './orders.reducer';

export const selectOrdersState =
    createFeatureSelector<OrdersState>(ORDERS_FEATURE_KEY);

const {
    selectAll: selectAllOrders,
    selectEntities: selectOrderEntities
} = ordersAdapter.getSelectors(selectOrdersState);

export const selectOrdersList = selectAllOrders;       // array
export const selectOrdersEntities = selectOrderEntities; // map
