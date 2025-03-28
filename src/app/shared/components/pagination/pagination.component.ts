import { ChangeDetectionStrategy, Component, computed, input, output, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
    public maximoTamanho = input(4);
    public totalItems = input(0);
    public paginaAtual = input(1);
    public emitPagina = output<number>();
    public itemsPorPagina = input(0);

    totalPaginas = computed(() => Math.ceil(this.totalItems() / this.itemsPorPagina()));

    paginasVisiveis = computed(() => {
        const total = this.totalPaginas();
        const atual = this.paginaAtual();
        const max = Math.max(3, this.maximoTamanho());
        const meio = Math.floor(max / 2);
        let inicio = Math.max(1, atual - meio);
        let fim = Math.min(total, inicio + max - 1);
        if (fim - inicio + 1 < max) inicio = Math.max(1, fim - max + 1);
        return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
    });

    setPagina(pagina: number) {
        if (pagina >= 1 && pagina <= this.totalPaginas()) {
            this.emitPagina.emit(pagina);
        }
    }
}
