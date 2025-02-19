import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModule, HomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vaga-dev-frontend';
}
