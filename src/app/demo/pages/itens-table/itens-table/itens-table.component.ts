import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SteamItem } from 'src/app/models/steamItem.model';
import { ItensService } from 'src/app/services/itens.service';
import { UsersService } from 'src/app/services/users.service';
//https://steamcommunity.com/sharedfiles/filedetails/?id=2164283242 drop ativo de caixa
@Component({
  selector: 'itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.scss']
})
export class ItensTableComponent implements OnInit {
  
  displayedColumns: string[] = ['favoritar', 'name', 'differenceComparedToYesterday', 'trendMonthPercentage', 'trendYearPercentage', 'totalSales', 'marketQuantity', 'weeklySales', 'porcentagemVenda',  'medianMonth', 'marketPrice'];

  dataSource = new MatTableDataSource<any>();
  playerName: string = '';
  term: string = '';
  tipoItemFiltro: any = 1;
  tiposItens = [{nome: 'Nada', value: 0}, {nome: 'Caixa', value: 1},  {nome: 'Capsula', value: 2}, {nome: 'Adesivo', value: 3},  {nome: 'Agentes', value: 4}]
  private sort = new MatSort();
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  
  constructor(private service:ItensService, public itensService: ItensService) {}
 

  ngOnInit() {
      this.fazBuscaItens();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.itensService.buscarListaFavoritos();
    this.dataSource.sort = this.sort
  }


  fazBuscaItens(){
    this.service.getItensMercadoSteam2(this.term, this.tipoItemFiltro).subscribe((response:any) => this.dataSource = new MatTableDataSource(response['data']['items']) );
    this.dataSource.sort = this.sort;  

    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 1000);

  }

  verificarRaridadeCaixa(nome: string){
    if(this.tipoItemFiltro == 1){
      if(nome == "Recoil Case" || nome == 'Dreams & Nightmares Case' || nome == 'Snakebite Case' || nome == 'Fracture Case' || nome == 'Clutch Case'){
        //dropando normal
        return 'vermelho';
      }else if(nome == "Prisma 2 Case"  || nome == 'CS20 Case'  || nome == 'Prisma Case' || nome == 'Danger Zone Case'  || nome == 'Horizon Case'   || nome == 'Spectrum 2 Case' 
       || nome == 'Operation Hydra Case'  || nome == 'Spectrum Case'  || nome == 'Glove Case'  || nome == 'Gamma 2 Case'  || nome == 'Gamma Case' || nome == 'Chroma 3 Case' || nome == 'Operation Wildfire Case' || nome == 'Revolver Case'
       || nome == 'Shadow Case' || nome == 'Falchion Case' || nome == 'Chroma 2 Case' || nome == 'Chroma Case' || nome == 'Operation Vanguard Weapon Case' || nome == 'Operation Breakout Weapon Case' || nome == 'Huntsman Weapon Case'
       || nome == 'Operation Phoenix Weapon Case' || nome == 'CS:GO Weapon Case 3' || nome == 'Winter Offensive Weapon Case' || nome == 'CS:GO Weapon Case 2' || nome == 'Operation Bravo Case' || nome == 'CS:GO Weapon Case'){
        //drop raro
        return 'azul';
      }else{
        return 'verde';
        //não dropa mais
      }
    }
    return ''
  }



}