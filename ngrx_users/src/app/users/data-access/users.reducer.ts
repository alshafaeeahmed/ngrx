import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
    list: User[];         // users data
    loading: boolean;     // loading flag for UI
    error: unknown | null;
}

export const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
};

export const usersReducer = createReducer(
    initialState,

    // Start loading on loadUsers
    on(UsersActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    // Save users in Store on success
    on(UsersActions.loadUsersSuccess, (state, { users }) => {
        console.log('[Reducer] Saving users into store:', users);
        return {
            ...state,
            list: users,
            loading: false
        };
    }),

    // Save error, stop loading
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);
