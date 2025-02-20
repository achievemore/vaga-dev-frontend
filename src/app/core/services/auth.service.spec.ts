import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true if token is present in sessionStorage', (done: DoneFn) => {
        sessionStorage.setItem('token', 'test-token');
        service.isAuthenticated().subscribe(isAuthenticated => {
            expect(isAuthenticated).toBeTrue();
            done();
        });
    });

    it('should return false if token is not present in sessionStorage', (done: DoneFn) => {
        sessionStorage.removeItem('token');
        service.isAuthenticated().subscribe(isAuthenticated => {
            expect(isAuthenticated).toBeFalse();
            done();
        });
    });

    it('should remove token from sessionStorage on logout', () => {
        sessionStorage.setItem('token', 'test-token');
        service.logout();
        expect(sessionStorage.getItem('token')).toBeNull();
    });
});