import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from './users.models';
import { MOCK_USERS } from '../../shared/mock-data/users.mock';
import { API_CONFIG } from '../../shared/constants/api.constants';
@Injectable({ providedIn: 'root' })
export class UserService {
    // constructor(private http: HttpClient) {}


    getUsers(): Observable<User[]> {
        return of(MOCK_USERS).pipe(delay(API_CONFIG.DELAYS.USERS));
    }
}
