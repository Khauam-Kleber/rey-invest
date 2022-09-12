import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { SteamItem } from '../models/steamItem.model';
  
@Injectable({
  providedIn: 'root'
})
export class ItensService {
  // private url = 'https://steamfolio.com/api/Popular/sort?type=10&ascending=false&watchlist=false&searchTerm=karrigan&filterType=3';
  
  public listFavoritesUser = [];
  constructor(private httpClient: HttpClient, private userService: UsersService) {
   }



  getItensMercadoSteam(nome:string, tipoItem:string){
    return this.httpClient.get('https://steamfolio.com/api/Popular/sort?type=2&ascending=false&watchlist=false&searchTerm='+nome+'&filterType='+tipoItem+'')
  }

  getItemPrice (market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730) {
    // Type check the market_hash_name parameter for matching a string
    if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
        // Throw an error in case the check failed
        throw new Error('The "market_hash_name" parameter is not a valid string or missing.');
    }

    // Type check the appid parameter for matching a number
    if (typeof appid !== 'number') {
        // Throw an error in case the check failed
        throw new Error('The "appid" parameter is not a number or missing.');
    }

    // Encode the Steam Community Market endpoint for handling items with unique characters in their market_hash_name
    return this.httpClient.get(`http://steamcommunity.com/market/priceoverview/?market_hash_name=${market_hash_name}&appid=${appid}&currency=7`)
 
  }

  adicionarOuRemoverFavoritos(itemSteam){
    let usuarioLogado = this.userService.userValue['data']

    if(!this.listFavoritesUser.find(item => item.id === itemSteam.id)){
      this.listFavoritesUser.push(new SteamItem(itemSteam))
    }else{
      let objIndex = this.listFavoritesUser.findIndex((obj => obj.id == itemSteam.id));
      this.listFavoritesUser.splice(objIndex, 1);
    } 
    usuarioLogado.steamItems = this.listFavoritesUser;
    this.userService.updateFavorites(usuarioLogado.id, usuarioLogado).subscribe((response:any) =>  this.buscarListaFavoritos() );
  }

  buscarListaFavoritos(realTimePrice = false){
    this.userService.getFavoritemsUser().subscribe(
      response => {
        this.listFavoritesUser = response;
        if(realTimePrice){
          this.realTimePrice();
        }
      },
      error => {
      });
  }

  verificarFavoritos(element){
    if(this.listFavoritesUser && this.listFavoritesUser.find(e => e.id === element.id)){
      return false;
    }else{
      return true;
    }
  }

  realTimePrice(){
    this.listFavoritesUser.forEach((item,index)=> {
      this.getItemPrice(item.name).subscribe( (response:any) => {
        // element.medianPrice = response.medianPrice
        this.listFavoritesUser[index].lowest_price = response.lowest_price
        this.listFavoritesUser[index].volume = response.volume
        // this.itensService.listFavoritesUser.u
     });
    });
  }
}