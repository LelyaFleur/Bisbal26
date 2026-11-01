
import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit {
    user: any = {};
    loading = false;
    error = '';
    email: string;
    password: string;


    constructor(private  authService:  AuthService, private router: Router, public dialog: MatDialog) {
  }


    ngOnInit() {
        // reset login status
      //  this.authenticationService.logout();
    }



    login(formData) {

        if(formData.valid) {
            var email = formData.value.email;
            var password = formData.value.password;
            //console.log(formData.value);
            this.authService.login(email, password)
            .then(
                (success) => {
                //console.log(success);
                this.router.navigate(['/admin']);
            }).catch((error) => {

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                   // alert('Wrong password.');
                    this.openDialog('Error!', 'Contrassenya incorrecta.');
                } else if(errorCode === 'auth/invalid-email') {
                    this.openDialog('Error!', "L'email està mal formatat.");
                } else if(errorCode === 'auth/user-not-found') {
                    this.openDialog('Error!', "No hi ha cap usuari amb aquest identificador. Potser l'usuari ha sigut esborrat.");
                }
                //console.log(error);
                });
            }
    }

    openDialog(title, text) : void {
        let dialogRef = this.dialog.open(DialogComponent, {
        width: '350px',
        data: { title: title, text: text, social: false }
        });
        dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed');
        text = result;
        });
    }
}

