import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonsResolver } from 'src/app/services/dons.resolver';
import { OrphelinResolver } from 'src/app/services/orphelin.resolver';
import {  AdddonsComponent, } from './adddons/adddons.component';

import { DonsComponent } from './dons.component';
import { ListdonsComponent } from './listdons/listdons.component';

const routes: Routes = [
  {
    path: '',
    component: DonsComponent,
    children: [
      {
        path: 'ajout',
        component: AdddonsComponent,
      },
      {  
        path: 'liste',
        component: ListdonsComponent,
        resolve: {
          listdons:DonsResolver,
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
