import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private cache = new Map<number, User>();
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.http.get<{ users: User[] }>('/assets/data/users.json').subscribe(res => {
      this.users = res.users;
      res.users.forEach(u => this.cache.set(u.id, u));
    });
  }

  getUsers(page: number, pageSize: number = 3): Observable<{data: User[], total_pages: number}> {
    const start = (page-1) * pageSize;
    const end = start + pageSize;
    const data = this.users.slice(start, end);
    const total_pages = Math.ceil(this.users.length / pageSize);
    return of({data, total_pages}).pipe(delay(300)); // Simulate network delay
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.cache.get(id)).pipe(delay(200));
  }
}
