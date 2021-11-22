import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsComponent } from './movements.component';
import { MovementComponent } from './movement/movement.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MovementsComponent, MovementComponent],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule],
  exports: [MovementsComponent, MovementComponent],
})
export class MovementsModule {}
