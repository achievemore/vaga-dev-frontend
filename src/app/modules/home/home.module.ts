import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ListUsersComponent } from './list-users/list-users.component';



@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ],
  exports: [
    HomeComponent,
    SideBarComponent,
    ListUsersComponent
  ]
})
export class HomeModule { }
