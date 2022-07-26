import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private _serviceFCError: FirebaseCodeErrorsService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;
    console.log(email, password);

    this.authService.signInWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      if(user.user?.emailVerified){
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.warning('Por favor, verifique su correo electrónico', 'Alerta');
        this.router.navigate(['/verificar-correo']);
        // this.authService.signOut();
      }
      // this.toastr.success('Usuario logueado correctamente', 'Éxito');
    }
    ).catch(err => {
      this.loading = false;
      console.log(err);
      this.toastr.error(this._serviceFCError.firebaseCodeError(err.code), 'Error');
    })

  }

}
