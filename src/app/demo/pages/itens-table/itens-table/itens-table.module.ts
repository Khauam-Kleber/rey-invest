import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ItensTableRoutingModule } from './itens-table.routing.module';
import { ItensTableComponent } from './itens-table.component';

@NgModule({
  imports: [
    CommonModule,
    ItensTableRoutingModule,
    SharedModule,
    CommonModule , 
  ],
  declarations: [ItensTableComponent],

})
export class ItensTableModule { }
