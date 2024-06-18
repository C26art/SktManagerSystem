import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../../../services/bill.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import saveAs from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage: any;

  constructor(
    private billService: BillService,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { data: values };
    dialogConfig.width = '100%';

    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' bill',
      confirmation: true
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteBill(values.id);
      dialogRef.close();
    });
  }

  deleteBill(id: any) {
    this.billService.delete(id).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackBar(this.responseMessage, 'success', 'green-snackbar');
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  downloadReportAction(values: any) {
    this.ngxService.start();
    const data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total.toString(),
      productDetail: values.productDetail
    };

    console.log("Sending data to backend:", data);

    this.downloadFile(values.uuid, data);
  }

  downloadFile(fileName: string, data: any) {
    this.billService.getPdf(data).subscribe({
      next: (response) => {
        if (response instanceof Blob) {
          saveAs(response, fileName + '.pdf');
        } else {
          console.error('Unexpected response type', response);
        }
        this.ngxService.stop();
      },
      error: (error) => {
        console.error('Download failed', error.message);
        this.ngxService.stop();
      }
    });
  }
}
