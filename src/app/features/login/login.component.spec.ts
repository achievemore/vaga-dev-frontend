/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

class MockAuthService {
  isLoggedIn(): boolean {
    return false;
  }
  
  login(email: string, password: string) {
    return of({ token: 'mock-token' });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,   
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should redirect to /users if user is already logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const routerSpy = spyOn(router, 'navigate');
    
    component.ngOnInit(); 
    fixture.detectChanges();
    
    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });
  
  describe('#onSubmit', () => {
    it('should set loginError and errorMessage if the form is invalid', () => {
      const routerSpy = spyOn(router, 'navigate');
      
      component.loginForm.setValue({ email: '', password: '' });
      
      component.onSubmit();
      
      expect(component.loginError).toBeTrue();
      expect(component.errorMessage).toBe('Por favor, preencha o formulário corretamente.');
      expect(routerSpy).not.toHaveBeenCalled();
    });
    
    it('should call authService.login and navigate to /dashboard if login is successful', () => {
      const routerSpy = spyOn(router, 'navigate');
      spyOn(authService, 'login').and.returnValue(of({ token: 'mock-token' }));
      
      component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
      
      component.onSubmit();
      
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
      expect(component.loginError).toBeFalse();
      expect(component.errorMessage).toBeNull();
    });
    
    it('should set loginError and errorMessage if login fails', () => {
      const routerSpy = spyOn(router, 'navigate');
      spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Login failed')));
      
      component.loginForm.setValue({ email: 'test@example.com', password: 'wrong-password' });
      
      component.onSubmit();
      
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'wrong-password');
      expect(routerSpy).not.toHaveBeenCalled();
      expect(component.loginError).toBeTrue();
      expect(component.errorMessage).toBe('Falha no login. Verifique suas credenciais e tente novamente.');
    });
    
  });
  
  describe('#hideModal', () => {
    it('should reset loginError and errorMessage after 2 seconds', (done: DoneFn) => {
      component.loginError = true;
      component.errorMessage = 'Some error message';
      
      component.hideModal();
      
      setTimeout(() => {
        expect(component.loginError).toBeFalse();
        expect(component.errorMessage).toBe('');
        done();
      }, 2000);
    });
  });
});