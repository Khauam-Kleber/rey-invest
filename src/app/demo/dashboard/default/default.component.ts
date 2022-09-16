import { Component, OnInit } from '@angular/core';
import { ItensService } from 'src/app/services/itens.service.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(public itensService: ItensService,  private route: ActivatedRoute,) 
  {    
 
  }
  valorTesteMudar: any;
  
  // console.log(this.route.snapshot.paramMap.get("id"))
  ngOnInit() { 
    //para cada card buscar valores da steam em tempo real?
  
    this.itensService.buscarListaFavoritos(true);
    // setTimeout(() => {
     
    // }, 5000);
  }

  teste(event){
    console.log("falae " + event)
    this.itensService.adicionarOuRemoverFavoritos(event);
  }


}
