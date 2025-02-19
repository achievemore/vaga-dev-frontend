import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-blank-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blank-dashboard.component.html',
  styleUrl: './blank-dashboard.component.scss'
})
export class BlankDashboardComponent {
  @Output() goToListPage = new EventEmitter<string>();


  goToList(){
    this.goToListPage.emit('Listagem');
  }
}
