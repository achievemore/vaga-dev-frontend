import { Component, computed, inject, model, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { SistemaService } from '../../services/sistema.service';
import { ListagemUsuariosDto } from '../../models/listagem-usuarios.dto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ListagemUsuariosRequest } from '../../models/listagem-usuarios.request';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-listagem-usuarios',
    standalone: true,
    imports: [
        CardModule,
        DividerModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        TableModule,
        DatePipe,
        CurrencyPipe,
        PaginatorModule,
        PaginationComponent
    ],
    templateUrl: './listagem-usuarios.component.html',
    styleUrl: './listagem-usuarios.component.scss'
})
export class ListagemUsuariosComponent {
    protected qtdPorPaginaLista: number[] = [3, 6, 12];

    protected cargos = ['Diretor', 'Coodenador', 'Supervisor'];

    protected filtro = model('');
    protected totalUsuarios = signal(0);

    private service = inject(SistemaService);

    protected request = new BehaviorSubject<ListagemUsuariosRequest>(
        {
            page: 1,
            per_page: 3
        }
    );
    porPagina = this.request.value.per_page;

    protected lista: Signal<ListagemUsuariosDto[]> = toSignal(
        this.request.pipe(
            switchMap(({ per_page, page }) => {
                return this.service
                    .obterUsuarios({ per_page, page }).pipe(
                        map((item) => {
                            const lista: ListagemUsuariosDto[] =
                                item.data.map((u) => {
                                    return {
                                        nome: `${u.first_name} ${u.last_name}`,
                                        cargo: this.cargos[Math.floor(Math.random() * this.cargos.length)],
                                        escritorio: 'São Paulo',
                                        idade: Math.floor(Math.random() * 50) + 20,
                                        dataInicio: new Date(),
                                        salario: (Math.floor(Math.random() * 5000) + 2000).toString()
                                    } as ListagemUsuariosDto;
                                });
                            this.totalUsuarios.set(item.total);
                            return lista;
                        }),
                    );
            }
            )
        ), { initialValue: [] });

    protected listaFiltrada = computed(() => {
        if (!this.filtro()) return this.lista();
        return this.lista().filter((u) =>
            u.nome.toLocaleLowerCase().includes(this.filtro().toLocaleLowerCase())
        );
    });

    alterarPorPagina(value: number): void {
        this.request.next({
            page: 1,
            per_page: value
        });
    }

    alterarPagina(value: number | undefined): void {
        this.request.next({
            page: value!,
            per_page: this.porPagina
        });
    }

    get qtdRodapeTable(): string {
        return `Mostrando ${((this.request.value.page - 1) * this.request.value.per_page) + 1} a 
        ${(this.request.value.page * this.request.value.per_page)} de ${this.totalUsuarios()} entradas`;
    }
}
