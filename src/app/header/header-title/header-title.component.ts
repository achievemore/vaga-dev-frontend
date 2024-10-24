import { Component } from '@angular/core';

@Component({
  selector: 'app-header-title',
  standalone: true,
  imports: [],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss'
})
export class HeaderTitleComponent {
  title?: string = 'Bem vindo(a)';
  subtitle?: string = 'Use esse formulário para fazer login';
}
