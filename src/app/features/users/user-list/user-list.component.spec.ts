/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';

class MockUsersService {
  getUsers(page: number) {
    return of({
      data: [
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          first_name: 'George',
          last_name: 'Bluth',
          avatar: 'https://reqres.in/img/faces/1-image.jpg'
        }
      ]
    });
  }
}

class MockRouter {
  public url = '/'; 
  navigate(commands: any[]) {}
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let usersService: UsersService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        HttpClientModule
      ],
      providers: [
        { provide: UsersService, useClass: MockUsersService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch users on init and assign them to the users signal', () => {
      expect(component.users()).toEqual([
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          first_name: 'George',
          last_name: 'Bluth',
          avatar: 'https://reqres.in/img/faces/1-image.jpg'
        }
      ]);
    });

    it('should handle error if getUsers fails', () => {

      spyOn(usersService, 'getUsers').and.returnValue(
        throwError(() => new Error('Error fetching users'))
      );
      const consoleSpy = spyOn(console, 'error');

      component.ngOnInit();

      expect(consoleSpy).toHaveBeenCalledWith(new Error('Error fetching users'));
    });
  });



  describe('testeRoute', () => {
    it('should update filters if the route starts with /item1', () => {

      (router as MockRouter).url = '/item1/something';

      component.testeRoute('/item1');

      expect(component.filters.length).toBe(4);
      expect(component.filters).toEqual([
        {
          name: 'first_name',
          label: 'Nome',
          type: 'string'
        },
        {
          name: 'general',
          label: 'General',
          type: 'general'
        },
        {
          name: 'teste',
          label: 'Teste number',
          type: 'number'
        },
        {
          name: 'email',
          label: 'Teste select e-mail',
          type: 'select',
          selectOptions: [
            'george.bluth@reqres.in',
            'janet.weaver@reqres.in'
          ]
        }
      ]);
    });

    it('should keep default filters if the route does not start with /item1', () => {

      (router as MockRouter).url = '/other-route';

      component.testeRoute('/item1');

      expect(component.filters.length).toBe(1);
      expect(component.filters).toEqual([
        {
          name: 'general',
          label: 'General',
          type: 'general'
        }
      ]);
    });
  });
});
