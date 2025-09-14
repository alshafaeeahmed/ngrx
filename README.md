# NgRx Users & Orders Demo

Angular demonstration project with NgRx for state management - Users and Orders.

## Project Description

This project demonstrates the use of NgRx for application state management with two main features:

- **Users**: User list management with selection capability
- **Orders**: User orders management

## NgRx Architecture

### Store Structure

```typescript
{
  users: {
    entities: { [id]: User },
    ids: number[],
    selectedUserId: number | null,
    loading: boolean,
    error: string | null
  },
  orders: {
    entities: { [id]: Order },
    ids: number[]
  }
}
```

### Features Implemented

#### 1. Users Feature (`/src/app/users/data-access/`)

- **Actions**: `loadUsers`, `loadUsersSuccess`, `loadUsersFailure`, `selectUser`, `addUser`, `updateUser`, `removeUser`
- **Reducer**: Entity adapter pattern with `@ngrx/entity`
- **Effects**: `UsersEffects` - API calls handling
- **Selectors**: `selectSelectedUser`, `selectSelectedUserSummary`, `selectSelectedUserOrders`
- **Service**: `UserService` - API simulation

#### 2. Orders Feature (`/src/app/orders/`)

- **Actions**: `loadOrders`, `loadOrdersSuccess`, `loadOrdersFailure`
- **Reducer**: Entity adapter pattern
- **Effects**: `OrdersEffects` - API calls handling
- **Selectors**: `selectOrdersList`, `selectOrdersEntities`
- **Service**: `OrdersService` - API simulation

### Components Architecture

#### 1. UserOrdersComponent

- Main component with user selection buttons
- Dispatch actions: `loadUsers()`, `loadOrders()`, `selectUser()`

#### 2. SelectedUserNameComponent

- Separate component displaying the selected user's name
- Uses selector: `selectSelectedUserName`

#### 3. SelectedUserTotalComponent

- Separate component displaying the user's total orders
- Uses selector: `selectSelectedUserTotalOrders`

## NgRx Patterns Demonstrated

### 1. Entity Adapter Pattern

```typescript
// Users reducer with entity adapter
export const adapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: false,
});
```

### 2. Effects Pattern

```typescript
// Users effects
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map((users) => UsersActions.loadUsersSuccess({ users })),
        catchError((error) => of(UsersActions.loadUsersFailure({ error })))
      )
    )
  )
);
```

### 3. Selectors Pattern

```typescript
// Complex selector combining multiple features
export const selectSelectedUserSummary = createSelector(
  selectSelectedUser,
  selectSelectedUserOrders,
  (user, orders) => ({
    userName: user?.name ?? null,
    totalOrders: orders.reduce((acc, o) => acc + o.total, 0),
  })
);
```


## Development

### Starting the Project

```bash
ng serve
```

### Build

```bash
ng build
```

### Tests

```bash
ng test
```
