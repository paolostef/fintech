import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./views/login/login-routing.module').then(
        (m) => m.LoginRoutingModule
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./views/dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
