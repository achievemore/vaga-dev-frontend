import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TableUsersComponent } from './table-users/table-users.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { users, UsersService } from '../../../../shared/services/users.service';

interface MenuItem {
  label: string;
  icon: string;
  submenu?: string[];
  isOpen?: boolean;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listUsers: users[] = [];
  userLoggedIn: users = {};
  constructor(private authService: AuthService, private usersService: UsersService, private snackbarService: SnackbarService){}
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '../../../../../assets/images/icon-dashboard.svg', submenu: ['Gerenciar'], isOpen: false },
    { label: 'Usuários', icon: '../../../../../assets/images/Icon-user-menu.svg', submenu: ['Listagem', 'Cadastrar'], isOpen: true }
  ];
  selectedSubItem: string | null = 'Listagem';
  ngOnInit(){
    this.getUsers();
  }

  toggleSubmenu(item: MenuItem) {
    item.isOpen = !item.isOpen;
  }

  selectSubItem(subItem: string) {
    this.selectedSubItem = subItem;
  }

  logout(){
    this.authService.logout();
  }

  getUsers(){
    this.usersService.getUsers()
    .subscribe({
      next: ((users: any) => {
        const emailLocalStorage = localStorage.getItem('email');
        this.listUsers = [...users.data];
        this.userLoggedIn = {...users.data?.find((user: users) => user.email === emailLocalStorage)};
      }),
      error: ((error: any) => {
        console.log('', error)
        this.snackbarService.show({type: 'Error', text: 'Error ao carregar a lista de usuarios', color: 'red'});
      })
    })
  }
}
