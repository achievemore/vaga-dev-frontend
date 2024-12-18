import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { UsersService } from "../../core/services/users/users.service";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser, IUsers } from "../../interface/Users";
@Component({
  selector: "app-users",
  standalone: true,
  imports: [],
  providers: [UsersService],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  readonly #destroyRef = inject(DestroyRef);
  public listUser:Array<IUser> = [];

  constructor() {}

  ngOnInit(): void {
   this.getUser();

    this.usersService.
    changedUsers$.pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({
      next: (res) => {
        this.listUser = res?.data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getUser():void {
    this.usersService.getUsers();
  }

}
