import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from "../../core/services/auth/auth.service";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
})
export class LayoutComponent implements OnInit, OnDestroy {

  isCollapsed = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  isLoggedId(): boolean {
    return this.authService.isLoggedId("token");
  }
}
