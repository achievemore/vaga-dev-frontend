/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

  class MockRouter {
    navigate(path: string[]) {}
    url: string = '/';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#isActive', () => {
    it('should return true if the current URL starts with the given route', () => {
      (router as MockRouter).url = '/dashboard/overview';

      const result = component.isActive('/dashboard');

      expect(result).toBeTrue();
    });

    it('should return false if the current URL does not start with the given route', () => {
      (router as MockRouter).url = '/profile/settings';

      const result = component.isActive('/dashboard');

      expect(result).toBeFalse();
    });
  });

  describe('#navigateTo', () => {
    it('should navigate to the specified route', () => {
      const navigateSpy = spyOn(router, 'navigate');

      const route = '/dashboard';

      component.navigateTo(route);
      
      expect(navigateSpy).toHaveBeenCalledWith([route]);
    });
  });

});
