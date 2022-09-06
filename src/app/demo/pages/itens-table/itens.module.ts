import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensRoutingModule } from './itens-routing.module';
import { ItensService } from 'src/app/services/itens.service';


@NgModule({
  imports: [
    CommonModule,
    ItensRoutingModule
  ],
  declarations: [],
  providers:[
    ItensService
  ]
})
export class ItensModule { }
