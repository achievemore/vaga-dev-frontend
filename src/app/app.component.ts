import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgxWebstorageModule } from 'ngx-webstorage';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ButtonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'vaga-dev-frontend';
}
