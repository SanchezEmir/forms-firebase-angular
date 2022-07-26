import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorsService } from 'src/app/services/firebase-code-errors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataUser: any;

  constructor(
    private authService: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private _serviceFCError: FirebaseCodeErrorsService
  ) {

  }

  ngOnInit(): void {
    this.authService.currentUser.then(user => {
      if(user){
        if(user.emailVerified){
          this.dataUser = user;
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.toastr.warning('Por favor, inicia sesión.', 'Alerta');
        this.router.navigate(['/login']);
        // this.authService.signOut();
      }
    });
  }

  logOut() {
    // localStorage.removeItem('token');
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    } ).catch(err => {
      console.log(err);
      this.toastr.error(this._serviceFCError.firebaseCodeError(err.code), 'Error');
    })
  }

}
