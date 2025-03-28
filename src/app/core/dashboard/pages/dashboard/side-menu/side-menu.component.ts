import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
interface MenuItem {
  label: string;
  icon: string;
  submenu?: string[];
  isOpen?: boolean;
}
@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  @Output() subMenuSelected = new EventEmitter<string>();
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '../../../../../../assets/images/icon-dashboard.svg', submenu: ['Gerenciar'], isOpen: false },
    { label: 'Usuários', icon: '../../../../../../assets/images/Icon-user-menu.svg', submenu: ['Listagem', 'Cadastrar'], isOpen: true }
  ];
  @Input() selectedSubItem: string = 'Listagem';
  ngOnInit(){
    this.subMenuSelected.emit(this.selectedSubItem);
  }
  toggleSubmenu(item: MenuItem) {
    item.isOpen = !item.isOpen;
  }

  selectSubItem(subItem: string) {
    this.subMenuSelected.emit(subItem);
    this.selectedSubItem = subItem;
  }
}
