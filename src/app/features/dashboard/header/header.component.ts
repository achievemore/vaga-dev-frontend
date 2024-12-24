import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  onLogout() {
    const confirm = window.confirm('Tem certeza de que deseja sair?');
    if (confirm) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
  
}
