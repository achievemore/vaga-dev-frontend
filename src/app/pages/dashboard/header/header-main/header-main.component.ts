import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapTextCenter,
  bootstrapPersonFill,
  bootstrapGearFill,
  bootstrapBellFill
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-pages-dashboard-header-main',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({
    bootstrapTextCenter,
    bootstrapPersonFill,
    bootstrapGearFill,
    bootstrapBellFill
  })],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.scss'
})
export class HeaderMainComponent {

}
