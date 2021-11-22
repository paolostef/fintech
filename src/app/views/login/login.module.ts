import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SigninComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule],
  exports: [LoginComponent, RegisterComponent, SigninComponent],
})
export class LoginModule {}
