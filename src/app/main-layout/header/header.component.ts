import { Component } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @Output() toggleSidenav = new EventEmitter<void>();

  logout() {
    localStorage.removeItem('authData');
    window.location.href = '/login'; // or use router.navigate(['/login'])
  }
}


