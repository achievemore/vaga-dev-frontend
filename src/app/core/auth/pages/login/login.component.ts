import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReqresService } from '../../../../shared/reqres.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private reqResService: ReqresService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulário Enviado:', this.loginForm.value);
      const body = {
         "email": this.loginForm?.get('email')?.value,
         "password": this.loginForm?.get('password')?.value
      }
      this.reqResService.postLogin(body).subscribe((res) => console.log('sucesso', res));
    } else {
      console.log('Formulário Inválido');
    }
  }

}
