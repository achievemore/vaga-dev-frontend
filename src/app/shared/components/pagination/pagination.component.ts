import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
      console.log(this.currentPage)
  }

}
