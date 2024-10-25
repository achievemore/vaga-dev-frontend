import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapChevronDown,
  bootstrapBuildings,
  bootstrapFront
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-pages-dashboard-header-sidebar',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({
    bootstrapChevronDown,
    bootstrapBuildings,
    bootstrapFront
  })],
  templateUrl: './header-sidebar.component.html',
  styleUrl: './header-sidebar.component.scss'
})
export class HeaderSidebarComponent {
  cardTitle: string = 'Vaga Front-end AchieveMore';
}
