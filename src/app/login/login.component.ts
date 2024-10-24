import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title?: string = 'Área restrita';
  subtitle?: string = 'Digite seu e-mail e senha para entrar';

  onSubmit() {
  }
}
