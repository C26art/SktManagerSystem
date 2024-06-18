import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit{
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage = '';

  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.userService.getUsers().subscribe({
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

  onChange(status: any, id: any) {
    this.ngxService.start();
    let data = {
      status: status.toString(),
      id: id
    }

    this.userService.update(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }
}
