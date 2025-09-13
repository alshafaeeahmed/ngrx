import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from './users.models';
// If you have HttpClient later: import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    // constructor(private http: HttpClient) {}

    /**
     * Simulates an API call to fetch users.
     */
    getUsers(): Observable<User[]> {
        const mock: User[] = [
            { id: 1, name: 'Alice Cohen', },
            { id: 2, name: 'Bob Levy', },
            { id: 3, name: 'Charlie Smith', },
            { id: 4, name: 'Diana Brown', },
            { id: 5, name: 'Ethan Davis', },
            { id: 6, name: 'Fiona Wilson', },
            { id: 7, name: 'George Thompson', },
            { id: 8, name: 'Hannah Lee', },
            { id: 9, name: 'Isaac Clark', },
        ];
        return of(mock).pipe(delay(600));
        // Real world:
        // return this.http.get<User[]>('/api/users');
    }
}
