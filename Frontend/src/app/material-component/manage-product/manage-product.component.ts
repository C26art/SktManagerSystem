import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalConstants } from '../../shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage = '';

  constructor(
    private productService: ProductService,
    private snackBarService: SnackbarService,
    public dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProduct().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.componentInstance.onAddProduct.subscribe(() => {
      this.tableData();
    });
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.componentInstance.onEditProduct.subscribe(() => {
      this.tableData();
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' product',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    });
  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackBar(this.responseMessage, "success", "green-snackbar");
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message || GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  onChange(status: any, id: any) {
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id: id
    }

    this.productService.updateStatus(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message || GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
