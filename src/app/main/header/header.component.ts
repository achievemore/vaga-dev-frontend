import { Component, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { LocalStorage } from 'ngx-webstorage';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzIconModule, NzInputModule, NzBreadCrumbModule, NzPopoverModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isCollapsed = false;

  @LocalStorage('email')
  email!:string
  
  private authService = inject(AuthService);

  logout():void {
    this.authService.logout();
  }

}
