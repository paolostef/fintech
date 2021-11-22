import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [DashboardComponent, WelcomeComponent],
  imports: [
    CommonModule, MaterialModule, SharedModule, AppRoutingModule
  ], exports: [DashboardComponent, WelcomeComponent],
})
export class DashboardModule { }
