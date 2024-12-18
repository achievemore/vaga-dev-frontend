import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent implements OnInit, OnDestroy {
  // TODO: Dados mokados
  public form: FormGroup = this.fb.group({
    email: ["eve.holt@reqres.in"],
    password: ["cityslicka"],
  });

  private authService = inject(AuthService);

  private subscription!: Subscription;

  constructor(private fb: FormBuilder, private route:Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.subscription = this.authService.login(this.form.value).subscribe({
      next: () => {
        this.route.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  isLoggedIn():boolean {
    return this.authService.isLoggedId('token')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout():void {
    this.authService.logout();
  }
}
