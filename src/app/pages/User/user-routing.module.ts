import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';

import { UserComponent } from './user.component';
import {ListuserComponent } from './listuser/listuser.component';
import { UserResolver } from 'src/app/services/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'ajout',
        component: AdduserComponent,
      },
      {  
        path: 'liste',
        component: ListuserComponent,
        resolve: {
          listusers:UserResolver,
        }
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class AdoptionRoutingModule { }
