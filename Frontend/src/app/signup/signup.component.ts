import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordVisible = false;
  confirmPasswordVisible = false;
  signupForm!: FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmit(): boolean {
    return this.signupForm.controls['password'].value !== this.signupForm.controls['confirmPassword'].value;
  }

  handleSubmit(): void {
    if (this.signupForm.valid && !this.validateSubmit()) {
      this.ngxService.start();
      const formData = this.signupForm.value;
      const data = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password
      };

      this.userService.signup(data).subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.responseMessage = response?.message;
          this.snackBarService.openSnackBar(this.responseMessage, "");
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.ngxService.stop();
          this.responseMessage = error.error?.message || GlobalConstants.genericError;
          this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
    }
  }
}
