// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  urlApi = 'https://reqres.in/api/login';
  constructor(private http: HttpClient, private router: Router, private snackbarService: SnackbarService) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('token'));
  }

  login(body: any) {
    return this.http.post<any>(this.urlApi, body).subscribe( {
     next: (response) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/dashboard']);
        this.snackbarService.show({type: 'Sucesso', text: 'Login realizado com sucesso', color: 'green'});
      }
     },
     error: (error) => {
      console.log(error)
      if(error.status === 400){
        this.snackbarService.show({type: 'Error', text: 'Erro ao fazer login. Usuário não encontrado.', color: 'red'});
      }else{
        this.snackbarService.show({type: 'Error', text: 'Erro ao fazer login. Tentar novamente.', color: 'red'});
      }
      
     }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}