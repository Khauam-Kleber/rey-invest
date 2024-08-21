import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SteamItem } from 'src/app/models/steamItem.model';
import { ItensService } from 'src/app/services/itens.service';
import { UsersService } from 'src/app/services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

//https://steamcommunity.com/sharedfiles/filedetails/?id=2164283242 drop ativo de caixa
@Component({
  selector: 'itens-table',
  templateUrl: './itens-table.component.html',
  styleUrls: ['./itens-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItensTableComponent implements OnInit {
  
  displayedColumns: string[] = ['league', 'teamHome', 'scoreHome', 'teamAway', 'scoreAway'];
  dataSource = new MatTableDataSource<any>();
  oddsList:any = [];
  playerName: string = '';
  term: string = '';
  tipoItemFiltro: any = 1;
  // tiposItens = [{nome: 'Nada', value: 0}, {nome: 'Caixa', value: 1},  {nome: 'Capsula', value: 2}, {nome: 'Adesivo', value: 3},  {nome: 'Agentes', value: 4}]
  private sort = new MatSort();
  expandedElement: any | null;
  statisticsList:any[] = [];

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
    // this.itensService.buscarListaFavoritos();
    this.dataSource.sort = this.sort
    // setInterval(() => {
    //   this.fazBuscaItens();
    // }, 220000); 
  }


  fazBuscaItens(){
    this.service.findAllLiveEvents(this.term, this.tipoItemFiltro).subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response) 
      this.service.findAllLiveOdds(this.term, this.tipoItemFiltro).subscribe((response:any) => {
        this.oddsList = response;
      });
    });

    // this.dataSource.sort = this.sort;  
    // setTimeout(() => {
    //   this.dataSource.sort = this.sort;
    // }, 1000);
  }

  findStatistics(fixtureId){
    // this.service.findStatistics(fixtureId).subscribe((response:any) => {
    //   this.statisticsList.push(response);
    // });

    if(!this.statisticsList?.find(statistic => statistic.fixtureId === fixtureId)){
      this.statisticsList.push({fixtureId: fixtureId, statistic: this.mockEstatisticas});
    }
  }

  returnObjectStatistic(fixtureId, teamIndex){
    return this.statisticsList?.find(statistic => statistic.fixtureId === fixtureId).statistic[teamIndex];
  }
  //criar regra para quando o time da casa esta perdendo de 1x0 no primeiro tempo armazenar se no segundo tempo acontece pelo menos 5 escanteios
  //se possivel validar se é jogo importante e esta com titulares
  //apresentar evetos de cartões

  verificarRaridadeCaixa(nome: string){
    // if(this.tipoItemFiltro == 1){
    //   if(nome == "Recoil Case" || nome == 'Dreams & Nightmares Case' || nome == 'Snakebite Case' || nome == 'Fracture Case' || nome == 'Clutch Case'){
    //     //dropando normal
    //     return 'vermelho';
    //   }else if(nome == "Prisma 2 Case"  || nome == 'CS20 Case'  || nome == 'Prisma Case' || nome == 'Danger Zone Case'  || nome == 'Horizon Case'   || nome == 'Spectrum 2 Case' 
    //    || nome == 'Operation Hydra Case'  || nome == 'Spectrum Case'  || nome == 'Glove Case'  || nome == 'Gamma 2 Case'  || nome == 'Gamma Case' || nome == 'Chroma 3 Case' || nome == 'Operation Wildfire Case' || nome == 'Revolver Case'
    //    || nome == 'Shadow Case' || nome == 'Falchion Case' || nome == 'Chroma 2 Case' || nome == 'Chroma Case' || nome == 'Operation Vanguard Weapon Case' || nome == 'Operation Breakout Weapon Case' || nome == 'Huntsman Weapon Case'
    //    || nome == 'Operation Phoenix Weapon Case' || nome == 'CS:GO Weapon Case 3' || nome == 'Winter Offensive Weapon Case' || nome == 'CS:GO Weapon Case 2' || nome == 'Operation Bravo Case' || nome == 'CS:GO Weapon Case'){
    //     //drop raro
    //     return 'azul';
    //   }else{
    //     return 'verde';
    //     //não dropa mais
    //   }
    // }
    return ''
  }
 
  findOddValue(fixtureId, type){
    return this.oddsList.find(odd => odd.fixture.id === fixtureId)?.odds[0]?.values[type]?.odd
  }

  mockEstatisticas = [
    {
        "team": {
            "id": 620,
            "name": "Dinamo Zagreb",
            "logo": "https://media.api-sports.io/football/teams/620.png"
        },
        "statistics": [
            {
                "type": "Shots on Goal",
                "value": 4
            },
            {
                "type": "Shots off Goal",
                "value": 4
            },
            {
                "type": "Total Shots",
                "value": 8
            },
            {
                "type": "Blocked Shots",
                "value": 0
            },
            {
                "type": "Shots insidebox",
                "value": 4
            },
            {
                "type": "Shots outsidebox",
                "value": 4
            },
            {
                "type": "Fouls",
                "value": 10
            },
            {
                "type": "Corner Kicks",
                "value": 3
            },
            {
                "type": "Offsides",
                "value": 0
            },
            {
                "type": "Ball Possession",
                "value": "44%"
            },
            {
                "type": "Yellow Cards",
                "value": 1
            },
            {
                "type": "Red Cards",
                "value": null
            },
            {
                "type": "Goalkeeper Saves",
                "value": 2
            },
            {
                "type": "Total passes",
                "value": 264
            },
            {
                "type": "Passes accurate",
                "value": 209
            },
            {
                "type": "Passes %",
                "value": "79%"
            },
            {
                "type": "expected_goals",
                "value": null
            },
            {
                "type": "goals_prevented",
                "value": null
            }
        ]
    },
    {
        "team": {
            "id": 556,
            "name": "Qarabag",
            "logo": "https://media.api-sports.io/football/teams/556.png"
        },
        "statistics": [
            {
                "type": "Shots on Goal",
                "value": 2
            },
            {
                "type": "Shots off Goal",
                "value": 7
            },
            {
                "type": "Total Shots",
                "value": 12
            },
            {
                "type": "Blocked Shots",
                "value": 3
            },
            {
                "type": "Shots insidebox",
                "value": 6
            },
            {
                "type": "Shots outsidebox",
                "value": 6
            },
            {
                "type": "Fouls",
                "value": 8
            },
            {
                "type": "Corner Kicks",
                "value": 1
            },
            {
                "type": "Offsides",
                "value": 1
            },
            {
                "type": "Ball Possession",
                "value": "56%"
            },
            {
                "type": "Yellow Cards",
                "value": 1
            },
            {
                "type": "Red Cards",
                "value": null
            },
            {
                "type": "Goalkeeper Saves",
                "value": 3
            },
            {
                "type": "Total passes",
                "value": 335
            },
            {
                "type": "Passes accurate",
                "value": 293
            },
            {
                "type": "Passes %",
                "value": "87%"
            },
            {
                "type": "expected_goals",
                "value": null
            },
            {
                "type": "goals_prevented",
                "value": null
            }
        ]
    }
]


}