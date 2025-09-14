import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as UsersActions from './users.actions';
import * as LoadActions from './users.actions';
import { User } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
    loading: boolean;
    error: unknown | null;
    selectedUserId: number | null;

    selectedUserDetails: any | null;
    loadingSelectedUserDetails: boolean;
}

export const adapter = createEntityAdapter<User>({
    selectId: (u) => u.id,
    sortComparer: false,
});

export const initialState: UsersState = adapter.getInitialState({
    loading: false,
    error: null,
    selectedUserId: null,

    selectedUserDetails: null,
    loadingSelectedUserDetails: false,
});

export const usersReducer = createReducer(
    initialState,

    // =====  load users flow =====
    on(LoadActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(LoadActions.loadUsersSuccess, (state, { users }) => {
        const next = adapter.setAll(users, state);
        console.log('[Reducer][Entity] setAll -> ids:', next.ids, 'total:', users.length);
        return { ...next, loading: false };
    }),
    on(LoadActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // =====  CRUD =====
    on(UsersActions.addUser, (state, { user }) => {
        const exists = !!state.entities[user.id];
        if (exists) {
            console.log('[Reducer][CRUD] addUser -> exists, updating instead:', user.id);
            return adapter.updateOne({ id: user.id, changes: user }, state);
        }
        console.log('[Reducer][CRUD] addUser -> new id:', user.id);
        return adapter.addOne(user, state);
    }),

    on(UsersActions.addUsers, (state, { users }) => {
        return adapter.upsertMany(users, state);
    }),

    on(UsersActions.updateUser, (state, { user }) => {
        console.log('[Reducer][CRUD] updateUser -> id:', user.id, 'changes:', user.changes);
        return adapter.updateOne(user, state);
    }),

    on(UsersActions.saveUser, (state, { user }) => {
        return adapter.upsertOne(user, state);
    }),

    on(UsersActions.removeUser, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),

    // =====  selection (extended for §6) =====
    on(UsersActions.selectUser, (state, { id }) => ({
        ...state,
        selectedUserId: id,
        //  clear previous details on selection change; set loading flag only if id is not null
        selectedUserDetails: null,
        loadingSelectedUserDetails: !!id,
    })),

    // =====  selected user details load/cancel/success/failure =====
    on(UsersActions.loadSelectedUserDetails, (state) => ({
        ...state,
        loadingSelectedUserDetails: true,
    })),

    on(UsersActions.loadSelectedUserDetailsSuccess, (state, { details }) => ({
        ...state,
        selectedUserDetails: details,
        loadingSelectedUserDetails: false,
    })),

    on(UsersActions.loadSelectedUserDetailsFailure, (state, { error }) => ({
        ...state,
        loadingSelectedUserDetails: false,
        error,
    }))
);
