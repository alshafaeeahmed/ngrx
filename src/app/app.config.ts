import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { USERS_FEATURE_KEY, usersReducer } from './users/data-access/users.reducer';
import { UsersEffects } from './users/data-access/users.effects';
import { ORDERS_FEATURE_KEY, ordersReducer } from './orders/orders.reducer';
import { OrdersEffects } from './orders/orders.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({ [USERS_FEATURE_KEY]: usersReducer, [ORDERS_FEATURE_KEY]: ordersReducer }),
    provideEffects([UsersEffects, OrdersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })

  ]
};
