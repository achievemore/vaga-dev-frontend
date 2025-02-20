import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { IResponseListUsers, User } from '../../shared/interfaces/home.interface';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {
  pages: number[] = [];
  page = 1;
  searchTerm: string = '';
  listUsers!: IResponseListUsers;
  filteredUsers!: User[];


  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.getUsers(this.page);
  }

  getUsers(page: number) {
    this.homeService.listUsers(page).subscribe((response) => {
      this.listUsers = response;
      this.filteredUsers = response.data;
      this.generatePages();
    });
  }

  generatePages() {
    this.pages = Array.from({ length: this.listUsers.total_pages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.listUsers.total_pages) return;
    this.getUsers(page);
  }

  filterUsers() {
    const search = this.searchTerm.toLowerCase();
    this.filteredUsers = this.listUsers.data.filter(user =>
      user.id.toString().includes(search) ||
      user.first_name.toLowerCase().includes(search) ||
      user.last_name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  }

  getStartIndex(): number {
    return (this.listUsers.page - 1) * this.listUsers.per_page;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.listUsers.per_page, this.listUsers.total);
  }
}
