import { Component, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { TableColumns } from '../../../core/models/table-columns';
import { TableFilter } from '../../../core/models/table-filter';
import { UsersService } from '../../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports:[CommonModule, TableComponent, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users = signal<any[]>([]);
  columns: TableColumns[] = [
    { name: 'first_name', display: 'Nome' },
    { name: 'last_name',  display: 'Sobrenome' },
    { name: 'email',      display: 'E-mail' }
  ];
  filters: TableFilter[] = [
    {
      name: 'general',
      label: 'General',
      type: 'general'
    }
  ];
  
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.testeRoute('/item1')
    this.usersService.getUsers(1).subscribe({
      next: (resp: any) => {
        this.users.set(resp.data);
      },
      error: err => console.error(err)
    });
  }
  
  testeRoute(route: string){
    if (this.router.url.startsWith(route)) {
      this.filters = [
        {
          name: 'first_name',
          label: 'Nome',
          type: 'string'
        },
        {
          name: 'general',
          label: 'General',
          type: 'general'
        },
        {
          name: 'teste',
          label: 'Teste number',
          type: 'number'
        },
        {
          name: 'email',
          label: 'Teste select e-mail',
          type: 'select',
          selectOptions:['george.bluth@reqres.in', 'janet.weaver@reqres.in']
        }
      ];
    }
  }
  
}
