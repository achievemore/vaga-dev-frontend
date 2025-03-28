import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TableUsersComponent } from './table-users/table-users.component';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { users, UsersService } from '../../../../shared/services/users.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { BlankDashboardComponent } from './blank-dashboard/blank-dashboard.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableUsersComponent, SideMenuComponent, TopMenuComponent, BlankDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listUsers: users[] = [];
  userLoggedIn: users = {};
  subMenuSelected: string = 'Listagem';
  constructor(private usersService: UsersService, private snackbarService: SnackbarService){}

  ngOnInit(){
    this.getUsers();
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
        console.log('error:', error)
        this.snackbarService.show({type: 'Error', text: 'Error ao carregar a lista de usuarios', color: 'red'});
      })
    })
  }

  checkSubMenu(subMenu: string){
    this.subMenuSelected = subMenu;
  }
}
