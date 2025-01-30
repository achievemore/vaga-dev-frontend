import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';

@Component({
    selector: 'app-sistema-layout',
    standalone: true,
    imports: [RouterOutlet, MenuComponent],
    templateUrl: './sistema-layout.page.html',
    styleUrl: './sistema-layout.page.scss'
})
export class SistemaLayoutPage {

}
