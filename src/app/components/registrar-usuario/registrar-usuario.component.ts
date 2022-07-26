import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private toastr: ToastrService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
   }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    this.authService.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    }).catch(err => {
      console.log(err);
      this.toastr.error(this.firebaseError(err.code), 'Error');
    })

    console.log(email, password, repetirPassword);
    console.log(this.registrarUsuario);
    console.log(this.registrarUsuario.value);
  }

  firebaseError(code: string){
    switch(code){
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/invalid-email':
        return 'El email no es válido';
      default:
        return 'Error desconocido';
    }
  }

}
