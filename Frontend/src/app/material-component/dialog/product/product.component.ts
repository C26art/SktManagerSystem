import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../../services/product.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../../../../services/category.service';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm!: FormGroup;
  dialogAction = "Add";
  action = "Add";
  responseMessage: any;
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error: any) => {
        console.log(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      categoryId: formData.categoryId,
      description: formData.description,
      price: formData.price
    };

    this.productService.add(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackBarService.openSnackBar(this.responseMessage, "success", "green-snackbar");
      },
      error: (error: any) => {
        this.dialogRef.close();
        console.error(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  edit() {
    let formData = this.productForm.value;
    let data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      description: formData.description,
      price: formData.price
    };

    this.productService.update(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackBarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.dialogRef.close();
        console.error(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
