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
      svgPath: "assets/images/store.svg",
      subMenu: [{ name: "Dashboard", link: "dashboard" }],
    },
    {
      name: "Usuários",
      svgPath: "assets/images/ungroup.svg",
      groupName:'Gerenciar',
      subMenu: [
        { name: "Listagem", link: "users" },
        { name: "Cadastrar", link: "user" },
      ],
    },
  ];
}
