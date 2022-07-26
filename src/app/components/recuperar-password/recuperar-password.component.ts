import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private _serviceFCError: FirebaseCodeErrorsService
  ) {
    this.recuperPassword = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recuperarPassword(){

    const correo = this.recuperPassword.value.correo;

    this.authService.sendPasswordResetEmail(correo).then(() => {
      this.toastr.success('Se ha enviado un correo para restablecer la contraseña', 'Correo enviado');
      this.router.navigate(['/login']);
    } ).catch(error => {
      this.toastr.error(this._serviceFCError.firebaseCodeError(error.code), 'Error');
    })

  }

}
