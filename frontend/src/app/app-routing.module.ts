import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ChartComponent } from './components/chart/chart.component';

const routes: Routes = [
  {path: ' ', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'admin_login', component: AdminLoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: '404', component: NotFoundComponent, canActivate: [AuthGuardService]},
  {path: 'chart', component: ChartComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthService, AuthGuardService ]
})
export class AppRoutingModule { }