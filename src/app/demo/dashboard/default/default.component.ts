import { Component, OnInit } from '@angular/core';
import { ItensService } from 'src/app/services/itens.service.js';
import { ActivatedRoute } from '@angular/router';
import { SkinDialogForm } from '../../pages/itens-table/skin-dialog-form/skin-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(public itensService: ItensService,  private route: ActivatedRoute, public dialog: MatDialog) 
  {    
 
  }
  
  // console.log(this.route.snapshot.paramMap.get("id"))
  ngOnInit() { 
    //para cada card buscar valores da steam em tempo real?
  
    this.itensService.buscarListaFavoritos(true);

    // setTimeout(() => {
     
    // }, 5000);
  }

  removeItemCard(event){
    this.itensService.adicionarOuRemoverFavoritos(event);
  }

  dialogEditItem(event): void {
    const dialogRef = this.dialog.open(SkinDialogForm, {
      width: '250px',
      data: {item: event},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed ' + result);
    });
  }


}
