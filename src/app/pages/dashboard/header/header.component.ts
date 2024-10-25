import { Component } from '@angular/core';

import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';
import { HeaderMainComponent } from './header-main/header-main.component';

@Component({
  selector: 'app-pages-dashboard-header',
  standalone: true,
  imports: [
    HeaderSidebarComponent,
    HeaderMainComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
