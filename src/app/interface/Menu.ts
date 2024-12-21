interface SubMenu {
  name:string;
  link:string;
}

export interface IMenu {
  name:string;
  svgPath:string;
  classColor?:string;
  groupName?:string;
  subMenu:Array<SubMenu>
}
