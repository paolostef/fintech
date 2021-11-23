import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'cards',
    loadChildren: () =>
      import('../cards/cards-routing.module').then((m) => m.CardsRoutingModule),
  },
  {
    path: 'movements',
    loadChildren: () =>
      import('../movements/movements-routing.module').then(
        (m) => m.MovementsRoutingModule
      ),
  },
  {
    path: 'transfer',
    loadChildren: () =>
      import('../transfer/transfer-routing.module').then(
        (m) => m.TransferRoutingModule
      ),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('../appointments/appointments-routing.module').then(
        (m) => m.AppointmentsRoutingModule
      ),
  },
  {
    path: 'taxes',
    loadChildren: () =>
      import('../taxes/movements-routing.module').then(
        (m) => m.TaxesRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
