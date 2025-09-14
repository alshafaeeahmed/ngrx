# NgRx Users & Orders Demo

פרויקט הדגמה של Angular עם NgRx לניהול מצב אפליקציה - Users ו-Orders.

## תיאור הפרויקט

פרויקט זה מדגים שימוש ב-NgRx לניהול מצב אפליקציה עם שתי features עיקריות:

- **Users**: ניהול רשימת משתמשים עם אפשרות בחירה
- **Orders**: ניהול הזמנות של משתמשים

## ארכיטקטורה NgRx

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
- **Reducer**: Entity adapter pattern עם `@ngrx/entity`
- **Effects**: `UsersEffects` - טיפול ב-API calls
- **Selectors**: `selectSelectedUser`, `selectSelectedUserSummary`, `selectSelectedUserOrders`
- **Service**: `UserService` - API simulation

#### 2. Orders Feature (`/src/app/orders/`)

- **Actions**: `loadOrders`, `loadOrdersSuccess`, `loadOrdersFailure`
- **Reducer**: Entity adapter pattern
- **Effects**: `OrdersEffects` - טיפול ב-API calls
- **Selectors**: `selectOrdersList`, `selectOrdersEntities`
- **Service**: `OrdersService` - API simulation

### Components Architecture

#### 1. UserOrdersComponent

- קומפוננטה ראשית עם כפתורים לבחירת משתמש
- Dispatch actions: `loadUsers()`, `loadOrders()`, `selectUser()`

#### 2. SelectedUserNameComponent

- קומפוננטה נפרדת המציגה שם המשתמש הנבחר
- משתמשת ב-selector: `selectSelectedUserName`

#### 3. SelectedUserTotalComponent

- קומפוננטה נפרדת המציגה סך הזמנות של המשתמש
- משתמשת ב-selector: `selectSelectedUserTotalOrders`

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

### 4. Modern Angular Patterns

- **Standalone Components**: כל הקומפוננטות הן standalone
- **Inject Function**: שימוש ב-`inject()` במקום constructor injection
- **Signal-based**: שימוש ב-signals במקומות מתאימים

## File Structure

```
src/app/
├── app.config.ts          # NgRx store configuration
├── app.ts                 # Root component
├── app.html               # Root template
├── users/
│   ├── data-access/       # NgRx users feature
│   │   ├── users.actions.ts
│   │   ├── users.effects.ts
│   │   ├── users.reducer.ts
│   │   ├── users.selectors.ts
│   │   └── users.service.ts
│   ├── user-orders/       # Main component
│   ├── selected-user-name/ # Display component
│   └── selected-user-total/ # Display component
├── orders/                # NgRx orders feature
│   ├── orders.actions.ts
│   ├── orders.effects.ts
│   ├── orders.reducer.ts
│   ├── orders.selectors.ts
│   └── orders.service.ts
└── shared/                # Shared utilities
    ├── constants/
    ├── mock-data/
    ├── types/
    └── utils/
```

## Development

### התחלת הפרויקט

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
