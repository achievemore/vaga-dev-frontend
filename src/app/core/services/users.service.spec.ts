/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListResponse } from '../models/user-list-response';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  const mockResponse: UserListResponse = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      },
    ],
    support: {
      url:  'teste.com',
      text: 'test'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should perform a GET request and return the users', () => {
      const page = 1;

      service.getUsers(page).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error when performing GET request', () => {
      const page = 1;
      const errorMessage = 'Erro na requisição';

      service.getUsers(page).subscribe({
        next: () => fail('Deveria ter falhado com um erro'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users?page=${page}`);
      expect(req.request.method).toBe('GET');

      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });
});
