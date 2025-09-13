import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserName } from '../data-access/users.selectors';

@Component({
    selector: 'app-selected-user-name',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './selected-user-name.component.html',
    styleUrls: ['./selected-user-name.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUserNameComponent {
    private readonly store = inject(Store);
    name$: Observable<string | null> = this.store.select(selectSelectedUserName);
}
