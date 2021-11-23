import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SigninComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule, RouterModule, ValidatorsModule],
  exports: [LoginComponent, RegisterComponent, SigninComponent],
})
export class LoginModule {}
