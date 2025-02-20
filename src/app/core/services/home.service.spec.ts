import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { environment } from '../../../environments/environment';
import { IResponseListUsers } from '../../modules/shared/interfaces/home.interface';

describe('HomeService', () => {
    let service: HomeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HomeService]
        });
        service = TestBed.inject(HomeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch list of users', () => {
        const dummyUsers: IResponseListUsers = {
            page: 1,
            per_page: 6,
            total: 12,
            total_pages: 2,
            data: [
                { id: 1, email: 'test1@example.com', first_name: 'Test1', last_name: 'User1', avatar: 'avatar1.jpg' },
                { id: 2, email: 'test2@example.com', first_name: 'Test2', last_name: 'User2', avatar: 'avatar2.jpg' }
            ],
            support: {
                url: 'https://example.com/support',
                text: 'For support, contact us at support@example.com'
            }
        };

        service.listUsers(1).subscribe(users => {
            expect(users).toEqual(dummyUsers);
        });

        const req = httpMock.expectOne(`${environment.urlReqres}/users?page=1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsers);
    });
});