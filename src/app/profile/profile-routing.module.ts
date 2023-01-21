import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from './rules/rules.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"" , redirectTo:"user" , pathMatch:"full"},
  {path:"user" , component:UserComponent},
  {path:"rules" , component:RulesComponent}                         
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
