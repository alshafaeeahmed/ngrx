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
