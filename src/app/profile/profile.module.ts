import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserComponent } from './user/user.component';
import { RulesComponent } from './rules/rules.component';


@NgModule({
  declarations: [
    UserComponent,
    RulesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
