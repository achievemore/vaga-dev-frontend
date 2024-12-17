import { Component, OnDestroy, OnInit } from "@angular/core";
import { IMenus } from "./../../interface/Menu";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent implements OnInit, OnDestroy {
  menus: Array<IMenus> = [
    { name: "Dashboard", link: "dashboard", icon: "dashboard" },
    { name: "Listagem", link: "users", icon: "file" },
    { name: "Cadastrar", link: "user", icon: "unordered-list" },
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
