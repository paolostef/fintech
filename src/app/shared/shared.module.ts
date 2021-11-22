import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { OkCancelDialogComponent } from './components/ok-cancel-dialog/ok-cancel-dialog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

const modules = [
  LeafletMapComponent,
  OkCancelDialogComponent,
  SidenavComponent,
  FilterPipe,
  TruncatePipe
];

@NgModule({
  declarations: [...modules],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [...modules],
})
export class SharedModule {}
