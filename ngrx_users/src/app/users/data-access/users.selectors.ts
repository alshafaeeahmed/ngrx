import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, adapter } from './users.reducer';

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
export const selectSelectedUserId = createSelector(
    selectUsersState,
    (s) => s.selectedUserId
);