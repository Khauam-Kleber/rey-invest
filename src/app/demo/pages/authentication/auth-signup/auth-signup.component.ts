import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService,
      private toastr: ToastrService
    //   private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.usersService.userValue) {
          this.router.navigate(['/dashboard/default']);
      }
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.usersService.create(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                if(data.status === 403){
                    this.loading = false;
                    this.toastr.error('Erro!', 'Email já cadastrado', {
                        positionClass: "toast-top-center",
                    });

                }else{
                    this.toastr.success('Faça o login!', 'Cadastrado com Sucesso', {
                        positionClass: "toast-top-center",
                    });
                    this.router.navigate(['auth/signin']);
                }
             
            },
            error => {
                console.log(error)
                this.loading = false;
            });
  }
}
