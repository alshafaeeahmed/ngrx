import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersList = createSelector(
    selectUsersState,
    (state) => {
        console.log('[Selector] Users selected from store:', state.list);
        return state.list;
    }
);


/** Loading flag for spinners/skeletons */
export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);

/** Error if needed */
export const selectUsersError = createSelector(selectUsersState, (state) => state.error);
