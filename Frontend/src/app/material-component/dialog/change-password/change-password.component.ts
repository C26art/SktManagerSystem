import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  responseMessage: any;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]]
    });
  }

  validateSubmit(): boolean {
    return this.changePasswordForm.controls['newPassword'].value !== this.changePasswordForm.controls['confirmationPassword'].value;
  }

  handlePasswordChangeSubmit(): void {
    if (this.changePasswordForm.invalid || this.validateSubmit()) {
      this.snackBarService.openSnackBar("As senhas não coincidem.", GlobalConstants.error);
      return;
    }

    this.ngxService.start();
    const formData = this.changePasswordForm.value;

    console.log("Form Data:", formData);

    this.userService.changePassword(formData).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.dialogRef.close();
        this.snackBarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
