import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [ 
      {
        path: 'default',
        loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
      },
      { // caso fosse edição preenchido ou criação com parametro null
        path: 'default/:id',
        loadChildren: () => import('./default/default.module').then(m => m.DefaultModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
