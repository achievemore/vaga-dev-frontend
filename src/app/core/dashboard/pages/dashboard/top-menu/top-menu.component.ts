import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {

  @Input() userLoggedIn: any = ''
  constructor(private authService: AuthService){}

  logout(){
    this.authService.logout();
  }
}
