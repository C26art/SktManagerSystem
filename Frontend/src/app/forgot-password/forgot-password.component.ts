import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;
    const data = {
      email: formData.email
    };
    this.userService.forgotPassword(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.dialogRef.close();
        this.snackBarService.openSnackBar(this.responseMessage, "");
      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message ? error.error?.message : GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
