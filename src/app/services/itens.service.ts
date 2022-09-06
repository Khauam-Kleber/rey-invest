import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class ItensService {
  // private url = 'https://steamfolio.com/api/Popular/sort?type=10&ascending=false&watchlist=false&searchTerm=karrigan&filterType=3';
   
  constructor(private httpClient: HttpClient) { }
  
  getItensMercadoSteam(nome:string, tipoItem:string){
    return this.httpClient.get('https://steamfolio.com/api/Popular/sort?type=2&ascending=false&watchlist=false&searchTerm='+nome+'&filterType='+tipoItem+'')
    
  }
  
}