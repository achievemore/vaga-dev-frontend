import { Component, inject } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { LocalStorage } from "ngx-webstorage";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { AuthService } from "../../core/services/auth/auth.service";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    NzIconModule,
    NzInputModule,
    NzPopoverModule,
    BreadcrumbComponent,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  isCollapsed = false;

  @LocalStorage("email")
  email!: string;

  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
