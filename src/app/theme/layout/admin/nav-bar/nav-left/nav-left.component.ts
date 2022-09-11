import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  nome; 
  ngOnInit() {
    this.nome = this.usersService.userValue['data'].name
  }

}
