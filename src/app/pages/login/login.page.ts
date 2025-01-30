import { Component, DestroyRef, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginRequest } from './models/login.request';
import { TransformIntoForms } from '../../core/utils/transform-into-forms';
import { ToastModule } from 'primeng/toast';
import { AuthState } from '../../shared/states/auth.state';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ButtonModule,
        MenubarModule,
        InputTextModule,
        InputSwitchModule,
        PasswordModule,
        ReactiveFormsModule,
        ToastModule
    ],
    templateUrl: './login.page.html',
    styleUrl: './login.page.scss',
    providers: [
        MessageService,
        LoginService
    ]
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

    private fb = inject(FormBuilder);
    private loginService = inject(LoginService);
    private messageService = inject(MessageService);
    private authState = inject(AuthState);
    private router = inject(Router);
    private onDestroy = inject(DestroyRef);

    protected loginForm = this.fb.group<TransformIntoForms<LoginRequest>>({
        email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
        password: this.fb.control('', { nonNullable: true, validators: [Validators.required,] }),
    });

    protected loading = false;

    login(): void {
        this.loading = true;
        this.loginService.login(this.loginForm.value as LoginRequest)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (res) => {
                    if (res.error) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro ao autenticar',
                            detail: res.error
                        });
                        return;
                    }
                    this.authState.autenticar({
                        token: res.token!,
                        usuario: this.loginForm.controls.email.value
                    });
                    this.router.navigate(['/sistema']);
                },
                complete: () => this.loading = false
            });
    }

}
