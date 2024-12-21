import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ CommonModule,NzPaginationModule,NzIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input()page!:number
  @Input() total!:number
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageBoundsCorrection!: EventEmitter<number>;

  ngOnInit(): void {

  }

}
