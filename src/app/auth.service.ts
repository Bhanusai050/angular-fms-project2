import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userPermissions: string[] = [];

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/users/login', { email, password });
  }

  fetchPermissions(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`/api/users/permissions/${userId}`);
  }

  setPermissions(perms: string[]) {
    this.userPermissions = perms;
  }

  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }
}
