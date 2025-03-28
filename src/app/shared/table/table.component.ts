import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TableColumns } from '../../core/models/table-columns';
import { TableFilter } from '../../core/models/table-filter';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumns[] = [];
  @Input() filters: TableFilter[] = [];
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  pageSizeOptions = [5, 10, 20, 50, 100]

  pagesArray: number[] = [];

  sortColumn: string | null = null; 
  sortDirection: 'asc' | 'desc' | null = null;

  filteredData: any[] = [];
  displayedData: any[] = [];

  startItemIndex = 0;  
  endItemIndex = 0;
  
  constructor() { }
  
  ngOnInit() {
  }
  
  ngOnChanges() {
    this.applyFilters();
  }
  
  onFiltersChange(updatedFilters: TableFilter[]) {
    this.filters = [ ...updatedFilters ]; 
    this.applyFilters();
  }
  
  applyFilters() {
    
    let result = [...this.data];
    
    for (const f of this.filters) {
      if (!f.value) {
        continue;
      }
      
      switch (f.type) {
        case 'string':
        result = result.filter(item =>
          item[f.name]?.toString().toLowerCase()
          .includes(f.value.toLowerCase())
        );
        break;
        
        case 'select':
        result = result.filter(item => item[f.name] === f.value);
        break;
        
        case 'number':
        const numVal = +f.value;
        result = result.filter(item => +item[f.name] === numVal);
        break;

        case 'general':
        result = result.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(f.value)
          )
        );
        
        break;
      }
    }
    
    this.filteredData = result;
    this.totalItems = this.filteredData.length;

    this.applySort();

    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    this.applyPagination();
  }

  applySort() {
    if (!this.sortColumn) {
      return;
    }

    this.filteredData.sort((a, b) => {
      const valA = a[this.sortColumn!];
      const valB = b[this.sortColumn!];

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    if (this.sortDirection === 'desc') {
      this.filteredData.reverse();
    }
  }

  applyPagination() {
    this.totalItems = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1; 
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedData = this.filteredData.slice(startIndex, endIndex);

    this.startItemIndex = startIndex;
    this.endItemIndex = endIndex > this.totalItems ? this.totalItems : endIndex;
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.applyPagination();
  }

  sortBy(col: TableColumns) {
    if (this.sortColumn === col.name) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = 'asc';
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = col.name;
      this.sortDirection = 'asc';
    }

    this.applySort();
    this.applyPagination();
  }

  prevPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  goToPage(event: Event, page: number) {
    event.preventDefault();
    this.currentPage = page;
    this.applyPagination();
  }
  
}
