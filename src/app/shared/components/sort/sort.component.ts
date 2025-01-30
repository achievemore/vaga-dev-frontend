import { Component, model } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { SortModel } from './models/sort.model';

@Component({
    selector: '[app-sort]',
    standalone: true,
    imports: [InputIconModule],
    templateUrl: './sort.component.html',
    styleUrl: './sort.component.scss'
})
export class SortComponent {
    public orderColumn = model<SortModel>({
        nomeColuna: '',
        ordem: ''
    }, { alias: 'app-sort' });

    public nextOrder(): void {
        if (this.orderColumn().ordem === 'ASC') {
            this.orderColumn.update((c) => { return { ...c, ordem: 'DESC' }; });
        } else if (this.orderColumn().ordem === 'DESC') {
            this.orderColumn.update((c) => { return { ...c, ordem: '' }; });
        } else if (this.orderColumn().ordem === '') {
            this.orderColumn.update((c) => { return { ...c, ordem: 'ASC' }; });
        }
    }

}
