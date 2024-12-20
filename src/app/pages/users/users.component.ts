import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { UsersService } from "../../core/services/users/users.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IUser, IUsers } from "../../interface/Users";
import { NzTableModule, NzTableQueryParams } from "ng-zorro-antd/table";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: "app-users",
  standalone: true,
  imports: [NzTableModule,NzSelectModule, FormsModule, CommonModule,NzToolTipModule],
  providers: [UsersService],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  readonly #destroyRef = inject(DestroyRef);
  public listUser: Array<IUser> = [];

  public PageSizes: number[] = [6,10,20];

  public selectedValue:number = 6;

  listColumn: Array<any> = [
    { title: "Email" ,  compare: (a: IUser, b: IUser) => a.email.localeCompare(b.email) },
    { title: "Primeiro Nome",compare: (a: IUser, b: IUser) => a.first_name.localeCompare(b.first_name) },
    { title: "SobreNome",compare: (a: IUser, b: IUser) => a.last_name.localeCompare(b.last_name) },
    { title: "Avatar" },
  ];

  public total: number = 1;
  public pageSize: number = 6;
  public pageIndex: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.usersService.changedUsers$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (res) => {
          this.setParamsTable(res)
        },
        error: (err) => {
          console.error(err);
          this.setParamsTable()
        },
      });
  }

  private setParamsTable(val?:IUsers):void {
    this.total = val?.total || 0;
    this.pageIndex = val?.page || 0;
    this.pageSize = val?.per_page || 0;
    this.listUser = val?.data || [];
  }

  private getUser(page?: number, pageSize?:number): void {
    this.usersService.getUsers(page, pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    this.getUser(pageIndex, pageSize)
  }

  handleChanged(pageSize: number): void {
    this.getUser(this.pageIndex,pageSize)
  }
}
