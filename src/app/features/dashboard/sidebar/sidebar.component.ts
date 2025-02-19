import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }


}
