import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as UsersActions from './users.actions';
import { User } from './users.models';

export const USERS_FEATURE_KEY = 'users';

/** Entity state for Users; ids/entities maintained by @ngrx/entity */
export interface UsersState extends EntityState<User> {
    loading: boolean;
    error: unknown | null;
    /** will be used in later sections (selectors / navigation) */
    selectedUserId: number | null;
}

/** Create an adapter with default selectId (user.id) and no sort comparer */
export const adapter = createEntityAdapter<User>({
    selectId: (u) => u.id,
    sortComparer: false,
});

/** Add complementary flags next to the entity collection */
export const initialState: UsersState = adapter.getInitialState({
    loading: false,
    error: null,
    selectedUserId: null,
});

export const usersReducer = createReducer(
    initialState,

    // Keep from §1: loading flow
    on(UsersActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    // Save the whole collection in a normalized way (ids + entities)
    on(UsersActions.loadUsersSuccess, (state, { users }) => {
        const next = adapter.setAll(users, state);
        console.log('[Reducer][Entity] setAll -> ids:', next.ids, 'total:', users.length);
        return { ...next, loading: false };
    }),


    on(UsersActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),
);
