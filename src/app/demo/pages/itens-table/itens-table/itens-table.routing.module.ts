import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItensTableComponent } from './itens-table.component';

const routes: Routes = [
  {
    path: '',
    component: ItensTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ItensTableRoutingModule { }
