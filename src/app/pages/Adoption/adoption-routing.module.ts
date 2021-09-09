import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdoptionResolver } from 'src/app/services/adoption.resolver';
import { OrphelinResolver } from 'src/app/services/orphelin.resolver';
import { AddadoptionComponent, } from './addadoption/addadoption.component';

import { AdoptionComponent } from './adoption.component';
import { ListadoptionComponent } from './listadoption/listadoption.component';

const routes: Routes = [
  {
    path: '',
    component: AdoptionComponent,
    children: [
      {
        path: 'ajout',
        component: AddadoptionComponent,
      },
      {  
        path: 'liste',
        component: ListadoptionComponent,
        resolve: {
          listadoptions:AdoptionResolver,
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
