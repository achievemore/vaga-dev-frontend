import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaLayoutPage } from './sistema-layout.page';

describe('SistemaLayoutPage', () => {
  let component: SistemaLayoutPage;
  let fixture: ComponentFixture<SistemaLayoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemaLayoutPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemaLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
