import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, adapter } from './users.reducer';
import { selectOrdersList } from '../../orders/orders.selectors';
import { UserOrderSummary } from '../../shared/types/api.types';

/** Feature selector for the Users feature */
export const selectUsersState =
    createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

/** Adapter-provided selectors (selectIds/selectEntities/selectAll/selectTotal) */
const { selectAll, selectEntities, selectIds, selectTotal } =
    adapter.getSelectors(selectUsersState);

/** Public selectors for the UI / effects / other features */
export const selectUsersList = createSelector(selectAll, (list) => {
    console.log('[Selector][Entity] selectAll size:', list.length);
    return list;
});
export const selectUsersEntities = selectEntities;
export const selectUsersIds = selectIds;
export const selectUsersTotal = selectTotal;

export const selectUsersLoading = createSelector(
    selectUsersState,
    (s) => s.loading
);
export const selectUsersError = createSelector(
    selectUsersState,
    (s) => s.error
);

/** selectedUserId (primitive) */
export const selectSelectedUserId = createSelector(
    selectUsersState,
    (s) => s.selectedUserId
);

/** §4a: Selected user object (or null if none selected) */
export const selectSelectedUser = createSelector(
    selectSelectedUserId,
    selectUsersEntities,
    (selectedId, entities) => {
        const user = selectedId != null ? entities[selectedId] ?? null : null;
        console.log(
            '[Selector][Entity] selectSelectedUser -> id:',
            selectedId,
            'user:',
            user
        );
        return user;
    }
);

/** §4b: All orders for the currently selected user */
export const selectSelectedUserOrders = createSelector(
    selectSelectedUserId,
    selectOrdersList, // comes from orders.selectors.ts
    (selectedId, orders) => {
        const list = selectedId == null ? [] : orders.filter(o => o.userId === selectedId);
        console.log('[Selector] orders for selected user:', selectedId, '->', list.length);
        return list;
    }
);
/** §4c: Summary object { userName, totalOrders } for the selected user */
export const selectSelectedUserSummary = createSelector(
    selectSelectedUser,        // { id, name, ... } | null
    selectSelectedUserOrders,  // Order[]
    (user, orders): UserOrderSummary => {
        if (!user) {
            console.log('[Selector] summary -> no selected user');
            return { userName: null, totalOrders: 0 };
        }
        const total = orders.reduce((acc, o) => acc + (o.total || 0), 0);
        const summary: UserOrderSummary = { userName: user.name, totalOrders: total };
        console.log('[Selector] summary ->', summary);
        return summary;
    }
);
// user name only (null-safe)
export const selectSelectedUserName = createSelector(
    selectSelectedUser,
    (u) => u?.name ?? null
);

export const selectSelectedUserTotalOrders = createSelector(
    selectSelectedUserSummary,
    (s) => s.totalOrders
);