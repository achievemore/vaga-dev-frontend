import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from '../../core/services/login.service';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['login']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, NavbarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should make the email control required and validate email format', () => {
    const control = component.loginForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalse();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTrue();
  });

  it('should make the password control required and validate minimum length', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('12345');
    expect(control?.valid).toBeFalse();

    control?.setValue('123456');
    expect(control?.valid).toBeTrue();
  });

  it('should call login service and navigate on successful login', () => {
    const mockCredentials = { email: 'test@example.com', password: '123456' };
    loginServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    component.loginForm.setValue({ email: 'test@example.com', password: '123456' });
    component.login();

    expect(loginServiceSpy.login).toHaveBeenCalledWith(mockCredentials);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home/users/list']);
  });
});
