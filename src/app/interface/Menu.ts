interface SubMenu {
  name:string;
  link:string;
}

export interface IMenu {
  name:string;
  icon:string;
  subMenu:Array<SubMenu>
}
