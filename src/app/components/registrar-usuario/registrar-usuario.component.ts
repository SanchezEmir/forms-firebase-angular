import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private _serviceFCError: FirebaseCodeErrorsService
    ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;


    if(password !== repetirPassword){
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.loading = true;

    this.authService.createUserWithEmailAndPassword(email, password).then((user) => {
      // this.loading = false;
      // this.toastr.success('Usuario registrado correctamente', 'Éxito');
      // this.router.navigate(['/login']);
      this.verificarCorreo();
      console.log(user);
    }).catch(err => {
      this.loading = false;
      console.log(err);
      this.toastr.error(this._serviceFCError.firebaseCodeError(err.code), 'Error');
    })

    console.log(email, password);
    console.log(this.registrarUsuario);
    console.log(this.registrarUsuario.value);
  }

  // checkPassword(group: FormGroup): any {
  //   const pass = group.controls.password?.value;
  //   const confirmPassword = group.controls.repetirPassword?.value;
  //   return pass === confirmPassword ? null : { notSame: true }
  // }

  verificarCorreo(){
    this.authService.currentUser.then(user => {
      user?.sendEmailVerification().then(() => {
        this.toastr.info('Por favor, verifique su correo electrónico', 'Info');
        this.router.navigate(['/login']);
      }).catch(err => {
        console.log(err);
        this.toastr.error(this._serviceFCError.firebaseCodeError(err.code), 'Error');
      })
    });
  }

}
