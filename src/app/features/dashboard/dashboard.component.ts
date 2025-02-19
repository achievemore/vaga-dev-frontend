import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[HeaderComponent, SidebarComponent, RouterOutlet],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor() { }

}
