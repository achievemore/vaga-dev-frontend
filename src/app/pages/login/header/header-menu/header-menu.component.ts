import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapChevronDown } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-pages-login-header-menu',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ bootstrapChevronDown })],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {

}
