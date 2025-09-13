import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserTotalOrders } from '../data-access/users.selectors';

@Component({
    selector: 'app-selected-user-total',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './selected-user-total.component.html',
    styleUrls: ['./selected-user-total.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUserTotalComponent {
    private readonly store = inject(Store);
    total$: Observable<number> = this.store.select(selectSelectedUserTotalOrders);
}
