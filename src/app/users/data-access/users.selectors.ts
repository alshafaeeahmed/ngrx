import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, adapter } from './users.reducer';
import { selectOrdersList } from '../../orders/orders.selectors';
import { UserOrderSummary } from '../../shared/types/api.types';

export const selectUsersState =
    createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds, selectTotal } =
    adapter.getSelectors(selectUsersState);

export const selectUsersList = createSelector(selectAll, (list) => {
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

export const selectSelectedUserId = createSelector(
    selectUsersState,
    (s) => s.selectedUserId
);

export const selectSelectedUser = createSelector(
    selectSelectedUserId,
    selectUsersEntities,
    (selectedId, entities) => {
        const user = selectedId != null ? entities[selectedId] ?? null : null;
        return user;
    }
);

export const selectSelectedUserOrders = createSelector(
    selectSelectedUserId,
    selectOrdersList,
    (selectedId, orders) => {
        const list = selectedId == null ? [] : orders.filter(o => o.userId === selectedId);
        return list;
    }
);

export const selectSelectedUserSummary = createSelector(
    selectSelectedUser,
    selectSelectedUserOrders,
    (user, orders): UserOrderSummary => {
        if (!user) {
            return { userName: null, totalOrders: 0 };
        }
        const total = orders.reduce((acc, o) => acc + (o.total || 0), 0);
        const summary: UserOrderSummary = { userName: user.name, totalOrders: total };
        return summary;
    }
);

export const selectSelectedUserName = createSelector(
    selectSelectedUser,
    (u) => u?.name ?? null
);

export const selectSelectedUserTotalOrders = createSelector(
    selectSelectedUserSummary,
    (s) => s.totalOrders
);

export const selectLoadingSelectedUserDetails = createSelector(
    selectUsersState,
    (s) => s.loadingSelectedUserDetails
);

export const selectSelectedUserDetails = createSelector(
    selectUsersState,
    (s) => s.selectedUserDetails
);
