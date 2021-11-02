import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './views/card-list/card-list.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', component: CardListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
