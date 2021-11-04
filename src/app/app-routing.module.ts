import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardFormComponent } from './views/card-form/card-form.component';
import { CardListComponent } from './views/card-list/card-list.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cardform', component: CardFormComponent },
  { path: 'cardlist', component: CardListComponent },
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
