import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderTitleComponent } from './header-title/header-title.component';

@Component({
  selector: 'app-pages-login-header',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    HeaderMenuComponent,
    HeaderTitleComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  get headerImagePath() {
    return 'assets/img/image-header.png';
  }
}
