import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth/auth.service";
import { Router } from "@angular/router";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzSelectModule } from "ng-zorro-antd/select";
import { messageError } from "../../core/utils/message-error";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NgOptimizedImage,
  ],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  public backgroundUrl: string = "/assets/images/background.png";

  public selectedValueInst = "Institucional";

  public listInstitutional: Array<string> = ["Institucional"];

  public selectedValueProd = "Produtos";

  public listProduct: Array<string> = ["Produtos"];

  // TODO: Dados mokados
  public form: FormGroup = this.fb.group({
    email: [
      "eve.holt@reqres.in",
      [Validators.required, Validators.email, Validators.maxLength(20)],
    ],
    password: ["cityslicka", [Validators.required, Validators.maxLength(20)]],
    remenber: [false],
  });

  private authService = inject(AuthService);
  private notification = inject(NzNotificationService);
  readonly #destroyRef = inject(DestroyRef);

  public isLoading$:Observable<boolean> = this.authService.loading$.asObservable();

  constructor(private fb: FormBuilder, private route: Router) {}

  onSubmit() {
    if (!this.validateForm(this.form)) return;

    const { email, password } = this.form.value;

    const data = {
      email: email,
      password: password,
    };

    this.authService.login(data)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({
      next: () => {
        this.route.navigateByUrl("/");
      },
      error: (err) => {
        this.createNotification("error", "Erro no login");
        console.error(err);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isloggedin("token");
  }

  logout(): void {
    this.authService.logout();
  }

  private validateForm(form: FormGroup): boolean {
    for (const i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].updateValueAndValidity();
    }

    return form.valid;
  }

  message(form: FormGroup, nameField: string): string | undefined {
    return messageError(form, nameField);
  }

  createNotification(status: "success" | "error", message: string): void {
    this.notification.create(
      status,
      status === "success" ? "Sucesso" : "Erro",
      message,
      { nzPlacement: "top" }
    );
  }
}
