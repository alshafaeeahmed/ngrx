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
}

export const adapter = createEntityAdapter<User>({
    selectId: (u) => u.id,
    sortComparer: false,
});

export const initialState: UsersState = adapter.getInitialState({
    loading: false,
    error: null,
    selectedUserId: null,
});

export const usersReducer = createReducer(
    initialState,

    on(LoadActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(LoadActions.loadUsersSuccess, (state, { users }) => {
        const next = adapter.setAll(users, state);
        console.log('[Reducer][Entity] setAll -> ids:', next.ids, 'total:', users.length);
        return { ...next, loading: false };
    }),
    on(LoadActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

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

    // Update one (partial changes)
    on(UsersActions.updateUser, (state, { user }) => {
        console.log('[Reducer][CRUD] updateUser -> id:', user.id, 'changes:', user.changes);
        return adapter.updateOne(user, state);
    }),

    on(UsersActions.saveUser, (state, { user }) => {
        return adapter.upsertOne(user, state);
    }),

    // Remove one by id
    on(UsersActions.removeUser, (state, { id }) => {
        return adapter.removeOne(id, state);
    }),

    on(UsersActions.selectUser, (state, { id }) => ({
        ...state,
        selectedUserId: id
    }))
);
