import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDashboardComponent } from './blank-dashboard.component';

describe('BlankDashboardComponent', () => {
  let component: BlankDashboardComponent;
  let fixture: ComponentFixture<BlankDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
