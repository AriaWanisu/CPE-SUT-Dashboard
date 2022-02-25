import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { LoginGuardService } from './services/login-guard.service';

// import components
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { GraduatedComponent } from './components/graduated/graduated.component';
import { StudentComponent } from './components/student/student.component';
import { WorkComponent } from './components/work/work.component';
import { GenderComponent } from './components/gender/gender.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ScoreComponent } from './components/score/score.component';
import { UserComponent } from './components/user/user.component';
import { PasswordComponent } from './components/password/password.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { StudentDataComponent } from './components/student-data/student-data.component';
import { GenderDataComponent } from './components/gender-data/gender-data.component';
import { GraduatedDataComponent } from './components/graduated-data/graduated-data.component';

const routes: Routes = [
  // general
  {path: ' ' , redirectTo: '/home'},
  {path: 'home' , component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'admin_login', component: AdminLoginComponent},
  {path: 'register', component: RegisterComponent},

  // dashboard
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'student/general', component: StudentComponent, canActivate: [AuthGuardService]},
  {path: 'student/work', component: WorkComponent, canActivate: [AuthGuardService]},
  {path: 'student/gender', component: GenderComponent, canActivate: [AuthGuardService]},
  {path: 'student/graduated', component: GraduatedComponent , canActivate: [AuthGuardService]},
  {path: 'subject/gpa', component: SubjectComponent , canActivate: [AuthGuardService]},
  {path: 'score/teacher', component: ScoreComponent , canActivate: [AuthGuardService]},

  // user control
  {path: 'user', component: UserComponent , canActivate: [AuthGuardService]},
  {path: 'password', component: PasswordComponent , canActivate: [AuthGuardService]},

  // admin section
  {path: 'admin/analysis', component: AnalysisComponent , canActivate: [AdminGuardService]},
  {path: 'admin/student', component: StudentDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/gender', component: GenderDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/graduated', component: GraduatedDataComponent , canActivate: [AdminGuardService]},

  // etc.
  {path: 'chart', component: ChartComponent},
  {path: '404', component: NotFoundComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthService, AuthGuardService, LoginGuardService, AdminGuardService ]
})
export class AppRoutingModule { }