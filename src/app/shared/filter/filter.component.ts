import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableFilter } from '../../core/models/table-filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent  {

  constructor() { }

  @Input() filters: TableFilter[] = [];
  @Output() filtersChange = new EventEmitter<TableFilter[]>();

  onFilterChange(filter: TableFilter, newValue: any) {
    filter.value = newValue;
    this.filtersChange.emit(this.filters);
  }
}
