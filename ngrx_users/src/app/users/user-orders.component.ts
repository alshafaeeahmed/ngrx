import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserSummary } from './data-access/users.selectors';
import { loadUsers, selectUser } from './data-access/users.actions';
import { loadOrders } from './../orders/orders.actions';

@Component({
    selector: 'app-user-orders',
    standalone: true,
    imports: [NgIf, AsyncPipe],
    templateUrl: './user-orders.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrdersComponent {
    private readonly store = inject(Store);

    /** Expose summary as observable for the template */
    summary$: Observable<{ userName: string | null; totalOrders: number }> =
        this.store.select(selectSelectedUserSummary);

    /** Handlers to change selected user; in real app bind to list */
    selectUser(id: number | null) {
        // Dispatch selection action; null clears selection
        this.store.dispatch(selectUser({ id }));
    }
    ngOnInit(): void {
        // Kick off loading users and orders on screen load
        this.store.dispatch(loadUsers());
        this.store.dispatch(loadOrders());
    }
}
