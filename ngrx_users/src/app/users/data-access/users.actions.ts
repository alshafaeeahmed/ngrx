import { createAction, props } from '@ngrx/store';
import { User } from './users.models';

/** Component requests to load users (triggered on init). */
export const loadUsers = createAction('[Users] Load Users');

/** Effect returns users successfully from API. */
export const loadUsersSuccess = createAction(
    '[Users] Load Users Success',
    props<{ users: User[] }>()
);

/** Effect returns an error from API. */
export const loadUsersFailure = createAction(
    '[Users] Load Users Failure',
    props<{ error: unknown }>()
);
// Add a single user (should avoid duplicates by id)
export const addUser = createAction(
    '[Users] Add User',
    props<{ user: User }>()
);

// Add many users
export const addUsers = createAction(
    '[Users] Add Users',
    props<{ users: User[] }>()
);

// Update a single user (partial allowed)
export const updateUser = createAction(
    '[Users] Update User',
    props<{ user: { id: number; changes: Partial<User> } }>()
);

// Upsert (Save) a single user: add if new, update if exists
export const saveUser = createAction(
    '[Users] Save (Upsert) User',
    props<{ user: User }>()
);

// Remove by id
export const removeUser = createAction(
    '[Users] Remove User',
    props<{ id: number }>()
);