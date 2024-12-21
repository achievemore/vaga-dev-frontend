interface SubMenu {
  name:string;
  link:string;
}

export interface IMenu {
  name:string;
  svgPath:string;
  classColor?:string;
  subMenu:Array<SubMenu>
}
