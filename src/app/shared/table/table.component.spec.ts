/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableComponent } from './table.component';
import { TableFilter } from '../../core/models/table-filter';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Lifecycle', () => {
    it('should have default input values', () => {
      expect(component.data).toEqual([]);
      expect(component.columns).toEqual([]);
      expect(component.filters).toEqual([]);
      expect(component.totalPages).toBe(1);
      expect(component.totalItems).toBe(0);
      expect(component.pageSize).toBe(10);
      expect(component.currentPage).toBe(1);
    });

    it('should call applyFilters when inputs change (ngOnChanges)', () => {
      const applyFiltersSpy = spyOn(component, 'applyFilters').and.callThrough();

      component.data = [{ id: 1, name: 'Alice' }];
      component.ngOnChanges();

      expect(applyFiltersSpy).toHaveBeenCalled();
    });
  });

  describe('#onFiltersChange', () => {
    it('should update filters and call applyFilters', () => {
      const applyFiltersSpy = spyOn(component, 'applyFilters').and.callThrough();

      const updatedFilters: TableFilter[] = [
        { name: 'name', label: 'Name', type: 'string', value: 'Al' }
      ];

      component.onFiltersChange(updatedFilters);
      expect(component.filters).toEqual(updatedFilters);
      expect(applyFiltersSpy).toHaveBeenCalled();
    });
  });

  describe('#applyFilters', () => {
    beforeEach(() => {
      component.data = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 }
      ];
    });

    it('should filter data by string type', () => {
      component.filters = [
        { name: 'name', label: 'Name', type: 'string', value: 'Bob' }
      ];
      component.applyFilters();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].name).toBe('Bob');
    });

    it('should filter data by select type', () => {
      component.filters = [
        { name: 'email', label: 'Email', type: 'select', value: 'alice@example.com' }
      ];
      component.applyFilters();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].email).toBe('alice@example.com');
    });

    it('should filter data by number type', () => {
      component.filters = [
        { name: 'age', label: 'Age', type: 'number', value: 30 }
      ];
      component.applyFilters();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].age).toBe(30);
    });

    it('should filter data by general type (checks all fields)', () => {
      component.filters = [
        { name: 'general', label: 'General', type: 'general', value: 'char' }
      ];
      component.applyFilters();

      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].name).toBe('Charlie');
    });

    it('should not filter any data if filter values are empty', () => {
      component.filters = [
        { name: 'name', label: 'Name', type: 'string', value: '' }
      ];
      component.applyFilters();

      expect(component.filteredData.length).toBe(3);
    });
  });

  describe('#applySort', () => {
    beforeEach(() => {
      component.filteredData = [
        { id: 2, name: 'Bob', age: 30 },
        { id: 1, name: 'Alice', age: 25 },
        { id: 3, name: 'Charlie', age: 35 }
      ];
    });

    it('should sort data in ascending order by the specified column', () => {
      component.sortColumn = 'id';
      component.sortDirection = 'asc';
      component.applySort();

      expect(component.filteredData.map(item => item.id)).toEqual([1, 2, 3]);
    });

    it('should sort data in descending order by the specified column', () => {
      component.sortColumn = 'id';
      component.sortDirection = 'desc';
      component.applySort();

      expect(component.filteredData.map(item => item.id)).toEqual([3, 2, 1]);
    });

    it('should not sort if sortColumn is null', () => {
      component.sortColumn = null;
      component.applySort();

      expect(component.filteredData.map(item => item.id)).toEqual([2, 1, 3]);
    });
  });

  describe('#applyPagination', () => {
    beforeEach(() => {
      component.filteredData = Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`
      }));
      component.pageSize = 3;
    });

    it('should calculate totalPages correctly and slice displayedData', () => {
      component.currentPage = 1;

      component.applyPagination();

      expect(component.totalItems).toBe(7);
      expect(component.totalPages).toBe(3);
      expect(component.displayedData.length).toBe(3); 

      expect(component.pagesArray).toEqual([1, 2, 3]);
    });

    it('should show the correct items for page 2', () => {
      component.currentPage = 2;
      component.applyPagination();

      expect(component.displayedData.map(i => i.id)).toEqual([4, 5, 6]);
    });

  });

  describe('Pagination Methods', () => {
    beforeEach(() => {
      component.filteredData = Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`
      }));
      component.pageSize = 3;
      component.applyPagination();
    });

    it('should go to the previous page when prevPage is called', () => {
      component.currentPage = 2;
      const preventDefaultSpy = jasmine.createSpy();

      component.prevPage({ preventDefault: preventDefaultSpy } as any);
      expect(component.currentPage).toBe(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not go to page 0 when already on page 1', () => {
      component.currentPage = 1;
      const preventDefaultSpy = jasmine.createSpy();

      component.prevPage({ preventDefault: preventDefaultSpy } as any);
      expect(component.currentPage).toBe(1);
    });

    it('should go to the next page when nextPage is called', () => {
      component.currentPage = 1;
      const preventDefaultSpy = jasmine.createSpy();

      component.nextPage({ preventDefault: preventDefaultSpy } as any);
      expect(component.currentPage).toBe(2);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not go beyond the totalPages in nextPage call', () => {
      component.currentPage = 3;
      const preventDefaultSpy = jasmine.createSpy();

      component.nextPage({ preventDefault: preventDefaultSpy } as any);
      expect(component.currentPage).toBe(3);
    });

    it('should go to the selected page via goToPage', () => {
      const preventDefaultSpy = jasmine.createSpy();
      component.goToPage({ preventDefault: preventDefaultSpy } as any, 3);

      expect(component.currentPage).toBe(3);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('#sortBy', () => {
    beforeEach(() => {
      component.filteredData = [
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Charlie' }
      ];
      component.columns = [
        { name: 'id', display: 'ID' },
        { name: 'name', display: 'Name' }
      ];
    });

    it('should toggle sortDirection between "asc" and "desc" if the same column is selected', () => {
      component.sortColumn = 'id';
      component.sortDirection = 'asc';

      component.sortBy(component.columns[0]); // same column: "id"
      expect(component.sortDirection).toBe('desc');

      component.sortBy(component.columns[0]); // toggle again
      expect(component.sortDirection).toBe('asc');
    });
  });

  describe('#onPageSizeChange', () => {
    it('should reset currentPage to 1 and re-apply pagination', () => {
      const applyPaginationSpy = spyOn(component, 'applyPagination').and.callThrough();

      component.currentPage = 5;
      component.onPageSizeChange();

      expect(component.currentPage).toBe(1);
      expect(applyPaginationSpy).toHaveBeenCalled();
    });
  });

});
