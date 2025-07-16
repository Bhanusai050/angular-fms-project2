import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
   id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }

  setUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}



