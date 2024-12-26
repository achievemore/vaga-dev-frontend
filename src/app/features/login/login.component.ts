import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loginError: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/users']);
    }
  }

  onSubmit() {
    this.loginError = false;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loginError = true;
      this.errorMessage = 'Por favor, preencha o formulário corretamente.';
      this.hideModal();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loginError = true;
        this.errorMessage = 'Falha no login. Verifique suas credenciais e tente novamente.';
      }
    });
  }

  hideModal() {
    setTimeout(() => {
      this.loginError = false;
      this.errorMessage = '';
    }, 2000);
  }

}
