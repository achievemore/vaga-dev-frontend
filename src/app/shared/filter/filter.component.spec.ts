/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterComponent } from './filter.component';
import { TableFilter } from '../../core/models/table-filter';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have an empty filters array by default', () => {
      expect(component.filters).toEqual([]);
    });
  });

  describe('#onFilterChange', () => {
    it('should update the filter value and emit filtersChange', () => {
      const mockFilters: TableFilter[] = [
        { name: 'first_name', label: 'First Name', type: 'string' },
        { name: 'email', label: 'Email', type: 'string' }
      ];
      component.filters = mockFilters;
      fixture.detectChanges();

      const filterToChange = mockFilters[0];
      const newValue = 'John';

      const emitSpy = spyOn(component.filtersChange, 'emit');

      component.onFilterChange(filterToChange, newValue);

      expect(filterToChange.value).toBe(newValue);
      expect(emitSpy).toHaveBeenCalledWith(mockFilters);
    });
  });
});
