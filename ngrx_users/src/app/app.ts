import { Component, signal } from '@angular/core';
import { UserOrdersComponent } from './users/user-orders/user-orders.component';
import { SelectedUserNameComponent } from './users/selected-user-name/selected-user-name.component';
import { SelectedUserTotalComponent } from './users/selected-user-total/selected-user-total.component';

@Component({
  selector: 'app-root',
  imports: [UserOrdersComponent, SelectedUserNameComponent, SelectedUserTotalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngrx_users');
}
