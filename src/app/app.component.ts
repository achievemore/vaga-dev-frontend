import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './login/login.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vaga-dev-frontend';
}
