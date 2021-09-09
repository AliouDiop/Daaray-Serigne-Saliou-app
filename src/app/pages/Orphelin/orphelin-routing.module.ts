import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrphelinResolver } from 'src/app/services/orphelin.resolver';
import { AddorphelinComponent } from './addorphelin/addorphelin.component';

import { ListorphelinComponent } from './listorphelin/listorphelin.component';
import { OrphelinComponent } from './orphelin.component';

const routes: Routes = [
  {
    path: '',
    component: OrphelinComponent,
    children: [
      {
        path: 'ajout',
        component: AddorphelinComponent,
      },
      {  
        path: 'liste',
        component: ListorphelinComponent,
        resolve: {
          listorphelins:OrphelinResolver,
        }
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class OrphelinRoutingModule { }
