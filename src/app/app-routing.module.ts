import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { CardsComponent } from './views/cards/cards.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { MovementsComponent } from './views/movements/movements.component';
import { TransferComponent } from './views/transfer/transfer.component';
import { WelcomeComponent } from './views/welcome/welcome.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', redirectTo: 'login/signin' },
  { path: 'login/signin', component: LoginComponent },
  { path: 'login/signup', component: LoginComponent }, //TODO SIGNUP
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'movements', component: MovementsComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'taxes', component: WelcomeComponent }, //TODO TAXES
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login/signin' },
  { path: '**', redirectTo: 'login/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
