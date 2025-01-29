import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ButtonModule,
        MenubarModule,
        InputTextModule,
        InputSwitchModule,
        PasswordModule
    ],
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss'
})
export class LoginPage {
    items: MenuItem[] | undefined = [
        {
            label: 'Institucional',
            items: [
                {
                    label: 'Quem Somos'
                }
            ]
        },
        {
            label: 'Produtos',
            items: [
                {
                    label: 'Produto 1'
                }
            ]
        },
        {
            label: 'Contato'
        }
    ];



}
