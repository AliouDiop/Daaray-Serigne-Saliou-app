import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivitesResolver } from '../services/activites.resolver';
import { Subheader1Resolver } from '../_metronic/partials/layout/subheader/subheader1/subheader1.resolver';
import { OrphelinResolver } from '../services/orphelin.resolver';
import { AdoptionResolver } from '../services/adoption.resolver';
import { DonsResolver } from '../services/dons.resolver';
import { UserResolver } from '../services/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
          resolve: {
            listactivites:ActivitesResolver,
          }
      },
      {
        path: 'orphelin',
        loadChildren: () =>
          import('./orphelin/orphelin.module').then((m) => m.OrphelinModule),
          resolve: {
            listorphelins:OrphelinResolver,
          }
      },
      {
        path: 'adoption',
        loadChildren: () =>
          import('./adoption/adoption.module').then((m) => m.AdoptionModule),
          resolve: {
            listadoptions:AdoptionResolver,
          }
      },
      {
        path: 'dons',
        loadChildren: () =>
          import('./dons/dons.module').then((m) => m.DonsModule),
          resolve: {
            listdons:DonsResolver,
          }
      },
      
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
          resolve: {
            listdons:UserResolver,
          }
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'ngbootstrap',
        loadChildren: () =>
          import('../modules/ngbootstrap/ngbootstrap.module').then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('../modules/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
    
    resolve: {
      info:Subheader1Resolver
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule],
  providers:[ActivitesResolver,OrphelinResolver,UserResolver,AdoptionResolver,DonsResolver,Subheader1Resolver]
})
export class PagesRoutingModule { }
