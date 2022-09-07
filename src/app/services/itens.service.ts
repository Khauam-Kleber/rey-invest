import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class ItensService {
  // private url = 'https://steamfolio.com/api/Popular/sort?type=10&ascending=false&watchlist=false&searchTerm=karrigan&filterType=3';
  
  private storage: Storage;
  public favoritos: any[] = [];
  
  constructor(private httpClient: HttpClient) {
    this.storage = window.localStorage;
    this.atualizarLista();
   }

  atualizarLista(){
    this.favoritos = this.get('favoritos');
  }

  getItensMercadoSteam(nome:string, tipoItem:string){
    return this.httpClient.get('https://steamfolio.com/api/Popular/sort?type=2&ascending=false&watchlist=false&searchTerm='+nome+'&filterType='+tipoItem+'')
  }

  getItemPrice ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730 } = {}) {
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

  //métodos storage

  set(fav: any) {
    if(fav.id == undefined){
      fav.id = this.favoritos.length +1;
    }

    let objIndex = this.favoritos.findIndex((obj => obj.id == fav.id));
    if(objIndex != -1 && objIndex != undefined && objIndex != null){
      this.favoritos[objIndex] = fav;
    }else{  
      this.favoritos.push(fav);
    }
    
    this.storage.setItem('favoritos', JSON.stringify(this.favoritos));
    this.atualizarLista()
}

  get(key: string): any {
    if (this.storage) {
      const userJson = this.storage.getItem(key);
      return userJson !== null ? JSON.parse(userJson) : [];
    }
    return [];
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

   delete(id: number) {
    console.log('teste')
    let objIndex = this.favoritos.findIndex((obj => obj.id == id));
    if(objIndex != -1 && objIndex != undefined && objIndex != null){
      this.favoritos.splice(objIndex, 1);
    }
    this.storage.setItem('favoritos', JSON.stringify(this.favoritos));
  }


}