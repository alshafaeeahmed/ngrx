import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { UserService } from './users.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorHandlerUtil } from '../../shared/utils/error-handler.util';

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(() => {
                console.log('[Effect] loadUsers triggered');
                return this.userService.getUsers().pipe(
                    map((users) => {
                        console.log('[Effect] API returned users:', users);
                        return UsersActions.loadUsersSuccess({ users });
                    }),
                    catchError((error) => {
                        ErrorHandlerUtil.logError('UsersEffect.loadUsers', error);
                        const apiError = ErrorHandlerUtil.handleHttpError(error);
                        return of(UsersActions.loadUsersFailure({ error: apiError }));
                    })
                );
            })
        )
    );
} 