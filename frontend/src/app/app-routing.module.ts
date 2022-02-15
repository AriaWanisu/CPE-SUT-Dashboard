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
import { LoginGuardService } from './services/login-guard.service';
import { HomeComponent } from './components/home/home.component';
import { GraduatedComponent } from './components/graduated/graduated.component';
import { StudentComponent } from './components/student/student.component';
const routes: Routes = [
  {path: ' ' , redirectTo: '/home'},
  {path: 'home' , component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'admin_login', component: AdminLoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'student', component: StudentComponent, canActivate: [AuthGuardService]},
  {path: '404', component: NotFoundComponent, canActivate: [AuthGuardService]},
  {path: 'chart', component: ChartComponent},
  {path: 'graduated', component: GraduatedComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthService, AuthGuardService, LoginGuardService ]
})
export class AppRoutingModule { }