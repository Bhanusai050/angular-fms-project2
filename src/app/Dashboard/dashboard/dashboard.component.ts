import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { UserService,User } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService) {}

 ngOnInit() {
  const stored = localStorage.getItem('username') || sessionStorage.getItem('username');
  console.log('Dashboard loaded with username:', stored);
  this.userName = stored ?? 'User';
}

  logout() {
    // Clear tokens and username
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('username');
    window.location.href = '/login';
  }
}
