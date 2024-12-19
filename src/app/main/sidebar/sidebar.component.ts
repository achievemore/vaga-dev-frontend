import { Component } from "@angular/core";
import { IMenu } from "./../../interface/Menu";
import { RouterModule } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule, NzMenuModule, NzLayoutModule, NzIconModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  menus: Array<IMenu> = [
    {
      name: "Dashboard",
      icon: "appstore",
      subMenu: [{ name: "Gerenciar", link: "dashboard" }],
    },
    {
      name: "Usuários",
      icon: "copy",
      subMenu: [
        { name: "Listagem", link: "users" },
        { name: "Cadastrar", link: "user" },
      ],
    },
  ];
}
