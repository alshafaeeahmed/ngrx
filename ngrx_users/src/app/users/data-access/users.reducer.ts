import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as UsersActions from './users.actions';
import * as LoadActions from './users.actions'; // loadUsers / loadUsersSuccess / loadUsersFailure from §1
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

    // ===== From §1 (loading flow) =====
    on(LoadActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(LoadActions.loadUsersSuccess, (state, { users }) => {
        const next = adapter.setAll(users, state);
        console.log('[Reducer][Entity] setAll -> ids:', next.ids, 'total:', users.length);
        return { ...next, loading: false };
    }),
    on(LoadActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // ===== §3: CRUD =====

    // Add one — but if id exists, update instead (explicit “no duplicates” logic)
    on(UsersActions.addUser, (state, { user }) => {
        const exists = !!state.entities[user.id];
        if (exists) {
            console.log('[Reducer][CRUD] addUser -> exists, updating instead:', user.id);
            return adapter.updateOne({ id: user.id, changes: user }, state);
        }
        console.log('[Reducer][CRUD] addUser -> new id:', user.id);
        return adapter.addOne(user, state);
    }),

    // Add many — rely on upsertMany to be safe, or validate individually
    on(UsersActions.addUsers, (state, { users }) => {
        console.log('[Reducer][CRUD] addUsers -> count:', users.length);
        // Option A: use upsertMany to avoid duplicates safely
        return adapter.upsertMany(users, state);
        // Option B: loop & apply same addUser logic (more verbose)
    }),

    // Update one (partial changes)
    on(UsersActions.updateUser, (state, { user }) => {
        console.log('[Reducer][CRUD] updateUser -> id:', user.id, 'changes:', user.changes);
        return adapter.updateOne(user, state);
    }),

    // Save (Upsert) one — canonical “save” semantics
    on(UsersActions.saveUser, (state, { user }) => {
        console.log('[Reducer][CRUD] saveUser (upsertOne) -> id:', user.id);
        return adapter.upsertOne(user, state);
    }),

    // Remove one by id
    on(UsersActions.removeUser, (state, { id }) => {
        console.log('[Reducer][CRUD] removeUser -> id:', id);
        return adapter.removeOne(id, state);
    }),
);
