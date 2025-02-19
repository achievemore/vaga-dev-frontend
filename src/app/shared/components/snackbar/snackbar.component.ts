import { Component } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  messageType: string = '';
  messageText: string = '';
  messageColor: string = '';
  isVisible: boolean = false;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.snackbarService.snackbarState$.subscribe((message: any) => {
      this.messageType = message?.type;
      this.messageText = message?.text;
      this.messageColor = message?.color;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    });
  }
}
