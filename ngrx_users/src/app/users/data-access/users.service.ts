import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from './users.models';
import { MOCK_USERS } from '../../shared/mock-data/users.mock';
import { API_CONFIG } from '../../shared/constants/api.constants';
// If you have HttpClient later: import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    // constructor(private http: HttpClient) {}

    /**
     * Simulates an API call to fetch users.
     * In production, this would make an HTTP request to the backend.
     */
    getUsers(): Observable<User[]> {
        return of(MOCK_USERS).pipe(delay(API_CONFIG.DELAYS.USERS));
        // Real world:
        // return this.http.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
    }
}
