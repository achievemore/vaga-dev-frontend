import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../../shared/services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder,
     private authService: AuthService,
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const body = {
         "email": this.loginForm?.get('email')?.value,
         "password": this.loginForm?.get('password')?.value
      }
      localStorage.setItem('email', this.loginForm?.get('email')?.value);
      this.authService.login(body);

    } else {
      console.log('Formulário Inválido');
    }
  }

}
