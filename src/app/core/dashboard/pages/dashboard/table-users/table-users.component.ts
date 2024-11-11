import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, DEFAULT_CURRENCY_CODE, Input, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import ptBr from '@angular/common/locales/pt';
import { users } from '../../../../../shared/services/users.service';


interface User {
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: Date;
  salary: number;
}
registerLocaleData(ptBr);
@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:    [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent {
  randomList = [
    { position: 'Diretor', office: 'Rio de Janeiro', age: 61, startDate: new Date('1952-02-12'), salary: 100000 },
    { position: 'Coordenador', office: 'Belo Horizonte', age: 42, startDate: new Date('2020-10-20'), salary: 15000 },
    { position: 'Coordenador', office: 'São Paulo', age: 36, startDate: new Date('2022-06-13'), salary: 15000 },
    { position: 'Supervisor', office: 'São Paulo', age: 25, startDate: new Date('2019-01-18'), salary: 8000 },
    { position: 'Assistente', office: 'São Paulo', age: 37, startDate: new Date('2018-03-30'), salary: 3500 },
    { position: 'TI', office: 'Osasco', age: 22, startDate: new Date('2019-03-30'), salary: 5800 },
    { position: 'TI', office: 'Paulista', age: 19, startDate: new Date('2023-03-30'), salary: 5800 },
  ];
  @Input() users: users[] = [];
  listUsers: User[] = [];
  filteredUser: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  entriesPerPage: number = 10;
  totalPages: number = 1;
  searchTerm: string = '';
  sortField: keyof User | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(){  }

  ngOnInit() {
      const filtred = this.users?.map((users: any) =>
        {
         const randomData = this.randomList[Math.floor(Math.random() * this.randomList.length)];
         return {name: `${users.first_name} ${users.last_name}`, ...randomData}
       });
     this.listUsers = [...filtred];
     this.filteredUser = [...filtred];
     this.updatePagination();

  }

  updatePagination() {
    // Ordenar a lista antes de paginar
    this.listUsers.sort((a, b) => {
      if (!this.sortField) return 0;
      const valueA = a[this.sortField];
      const valueB = b[this.sortField];
      const order = this.sortDirection === 'asc' ? 1 : -1;
      return valueA > valueB ? order : valueA < valueB ? -order : 0;
    });

    this.totalPages = Math.ceil(this.listUsers.length / this.entriesPerPage);
    this.paginatedUsers = this.listUsers.slice(
      (this.currentPage - 1) * this.entriesPerPage,
      this.currentPage * this.entriesPerPage
    );
  }

  onEntriesChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = parseInt(value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  filterTable() {
    this.listUsers = this.filteredUser.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  sortTable(field: keyof User) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.updatePagination();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (x, i) => i + 1);
  }
}
