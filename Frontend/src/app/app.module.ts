import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { MaterialModule } from './shared/material.module';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { provideHttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './signup/signup.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from '../../services/token-interceptor.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ConfirmationComponent } from './material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './material-component/dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryComponent } from './material-component/dialog/category/category.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductComponent } from './material-component/dialog/product/product.component';
import { MatSelectModule } from '@angular/material/select';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { ViewBillProductsComponent } from './material-component/dialog/view-bill-products/view-bill-products.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  bgsColor: "#7b1fa2",
  fgsColor: "#7b1fa2",
  fgsType: SPINNER.squareJellyBox,
  fgsSize: 100,
  hasProgressBar: false,
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    DashboardComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
    ViewBillProductsComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [provideHttpClient(), { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
