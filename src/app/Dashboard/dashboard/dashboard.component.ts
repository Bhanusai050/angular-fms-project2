
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { UserService, User } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // ✅ Use styleUrls, not styleUrl
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  isSidebarCollapsed: boolean = false; // ✅ Added for toggle

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const stored = localStorage.getItem('username') ?? sessionStorage.getItem('username');
    this.userName = stored || 'User';
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('username');
    window.location.href = '/home'; // Redirect to home after logout
    
    console.log("Logging out...");
  }
}