import { Component, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { map } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users: User[] = [];

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    const subscription = this.userService
    .getUsers()
    .pipe(
      map((response) => response.data)
    )
    .subscribe({
      next: (users) => {
        this.users = users;
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
