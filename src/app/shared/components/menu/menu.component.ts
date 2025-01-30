import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [NgClass, RouterModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

    listaMenu = [
        {
            title: 'Dashboard',
            icon: 'icon-house',
            submenu: [
                {
                    title: 'Gerenciar'
                }
            ]
        },
        {
            title: 'Usuários',
            icon: 'icon-squad',
            submenu: [
                {
                    title: 'Listagem',
                    route: '/sistema/listagem-usuarios'
                },
                {
                    title: 'Cadastrar'
                }
            ]
        }
    ];

    private renderer2 = inject(Renderer2);

    ativarDesativarSubMenu(index: number): void {
        this.renderer2.selectRootElement('#box-submenu' + index, true)?.classList.toggle('fechado');
    }
}
