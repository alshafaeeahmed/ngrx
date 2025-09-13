import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedUserName } from './data-access/users.selectors';

@Component({
  selector: 'app-selected-user-name',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <p><strong>User:</strong> {{ (name$ | async) ?? '—' }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedUserNameComponent {
  private readonly store = inject(Store);
  name$: Observable<string | null> = this.store.select(selectSelectedUserName);
}
