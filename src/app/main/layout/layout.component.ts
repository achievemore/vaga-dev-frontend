import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { AuthService } from "../../core/services/auth/auth.service";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(private authService:AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  isLoggedId(): boolean {
    return this.authService.isLoggedId("token");
  }
}
