import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, selectUser } from '../data-access/users.actions';
import { loadOrders } from '../../orders/orders.actions';
import { UserId } from '../../shared/types/api.types';

@Component({
    selector: 'app-user-orders',
    standalone: true,
    imports: [],
    templateUrl: './user-orders.component.html',
    styleUrls: ['./user-orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrdersComponent {
    private readonly store = inject(Store);

    /** Handlers to change selected user; in real app bind to list */
    selectUser(id: UserId): void {
        // Dispatch selection action; null clears selection
        this.store.dispatch(selectUser({ id }));
    }

    ngOnInit(): void {
        // Kick off loading users and orders on screen load
        this.store.dispatch(loadUsers());
        this.store.dispatch(loadOrders());
    }
}
