import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersService } from './orders.service';
import { loadOrders, loadOrdersSuccess, loadOrdersFailure } from './orders.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrdersEffects {
    private actions$ = inject(Actions);
    private ordersService = inject(OrdersService);

    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrders),
            switchMap(() =>
                this.ordersService.getOrders().pipe(
                    map((orders) => loadOrdersSuccess({ orders })),
                    catchError((error) => of(loadOrdersFailure({ error })))
                )
            )
        )
    );
}
