import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { IRequestLogin, IResponseLogin } from '../../modules/shared/interfaces/login.interface';
import { environment } from '../../../environments/environment';

describe('LoginService', () => {
    let service: LoginService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LoginService]
        });
        service = TestBed.inject(LoginService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login and store token in sessionStorage', () => {
        const mockRequest: IRequestLogin = { email: 'test@example.com', password: 'password123' };
        const mockResponse: IResponseLogin = { token: 'fake-jwt-token' };

        service.login(mockRequest).subscribe(response => {
            expect(response).toEqual(mockResponse);
            expect(sessionStorage.getItem('token')).toBe(mockResponse.token);
        });

        const req = httpMock.expectOne(`${environment.urlReqres}/login`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
});