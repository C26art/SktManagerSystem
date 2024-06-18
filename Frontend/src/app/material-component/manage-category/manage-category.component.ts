import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../../../services/category.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage = '';

  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(() => {
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
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(() => {
      this.tableData();
    });
  }
}
