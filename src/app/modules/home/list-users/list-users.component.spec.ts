import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListUsersComponent } from './list-users.component';
import { HomeService } from '../../../core/services/home.service';
import { IResponseListUsers } from '../../shared/interfaces/home.interface';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let homeService: jasmine.SpyObj<HomeService>;

  beforeEach(() => {
    const homeServiceSpy = jasmine.createSpyObj('HomeService', ['listUsers']);

    TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      providers: [
        { provide: HomeService, useValue: homeServiceSpy }
      ]
    });

    component = TestBed.createComponent(ListUsersComponent).componentInstance;
    homeService = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
  });

  it('should fetch users and set listUsers and filteredUsers', () => {
    const mockResponse: IResponseListUsers = {
      page: 1,
      per_page: 10,
      total: 100,
      total_pages: 10,
      data: [
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: 'https://example.com/avatar.jpg' }
      ],
      support: {
        url: 'https://example.com/support',
        text: 'Support text'
      }
    };

    homeService.listUsers.and.returnValue(of(mockResponse));

    component.getUsers(1);

    expect(homeService.listUsers).toHaveBeenCalledWith(1);
    expect(component.listUsers).toEqual(mockResponse);
    expect(component.filteredUsers).toEqual(mockResponse.data);
  });

  it('should call generatePages after fetching users', () => {
    const mockResponse: IResponseListUsers = {
      page: 1,
      per_page: 10,
      total: 100,
      total_pages: 10,
      data: [
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: 'https://example.com/avatar.jpg' }
      ],
      support: {
        url: 'https://example.com/support',
        text: 'Support text'
      }
    };

    spyOn(component, 'generatePages');
    homeService.listUsers.and.returnValue(of(mockResponse));

    component.getUsers(1);

    expect(component.generatePages).toHaveBeenCalled();
  });
});