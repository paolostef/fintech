import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './views/cards/cards.component';
import { LoginComponent } from './views/login/login.component';
import { MovementsComponent } from './views/movements/movements.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'mov', component: MovementsComponent },
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
