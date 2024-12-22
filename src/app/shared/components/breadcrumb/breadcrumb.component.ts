import { Component, inject } from "@angular/core";
import { BreadcrumbService } from "../../../core/services/breadcrumb/breadcrumb.service";
import { CommonModule } from "@angular/common";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule,NzBreadCrumbModule],
  providers: [BreadcrumbService],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.scss",
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);
  public breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}
