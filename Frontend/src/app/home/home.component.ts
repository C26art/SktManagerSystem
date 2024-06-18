import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const tokenCheckObservable = this.userService.checkToken();
    if (tokenCheckObservable) {
      tokenCheckObservable.subscribe({
        next: (response: any) => {
          this.router.navigate(['/cafe/dashboard']);
        },
        error: (error: any) => {
          console.log('Erro ao verificar token:', error);
        }
      });
    } else {
      console.log('Observable de verificação de token é nulo.');
    }
  }

  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.maxWidth = '100%';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  handleForgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.maxWidth = '100%';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.maxWidth = '100%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

}
