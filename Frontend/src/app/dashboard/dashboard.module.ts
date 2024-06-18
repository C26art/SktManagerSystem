import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';



@NgModule({

  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: []

})
export class DashboardModule { }
