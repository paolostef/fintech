import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './views/cards/cards.component';
import { LoginComponent } from './views/login/login.component';
import { MovementsComponent } from './views/movements/movements.component';
import { TransferComponent } from './views/transfer/transfer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'mov', component: MovementsComponent },
  { path: 'transfer', component: TransferComponent },
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
