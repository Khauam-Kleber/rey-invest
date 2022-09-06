import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  emailDB: string = "email@teste.com";
  senhaDB: string = "12345678";
  mensagem: string;

  form;
  constructor(private formBuilder:FormBuilder, private router: Router) {
      this.criarForm();
  }

  criarForm(){
      this.form = this.formBuilder.group({
        email:  ['', Validators.required ],
        password: ['', Validators.required ],
      });
  }

  ngOnInit() {
  }


  login(){
    console.log(this.form.get('email').value, this.form.get('password').value)
    this.router.navigate(['/dashboard/default'])
    // if (this.form.get('email').value == this.emailDB && this.form.get('password').value == this.senhaDB) {
    //     this.mensagem = "Login feito com sucesso!";
    // } else {
    //   this.mensagem = "E-mail ou a senha estar errado!"; 
    // }
  }
 
}
