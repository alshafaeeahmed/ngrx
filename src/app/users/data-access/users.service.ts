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
    getUserDetails(id: number) {
        const mock = { id, phone: '+972-50-123-4567', address: 'Herzl 10, Tel Aviv', role: 'Member' };
        return of(mock).pipe(delay(700)); // simulate latency
    }

}
