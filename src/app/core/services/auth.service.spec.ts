/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    token: 'mock-token'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('token');
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe(mockResponse.token);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(mockResponse);
  });

  it('should remove token when logout', () => {
    localStorage.setItem('token', 'existing-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should return true if user is logged', () => {
    localStorage.setItem('token', 'existing-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if user is not logged', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });
});
