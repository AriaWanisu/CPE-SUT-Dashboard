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
import { WorkDataComponent } from './components/work-data/work-data.component';
import { ScoreDataComponent } from './components/score-data/score-data.component';
import { GpaComponent } from './components/gpa/gpa.component';
import { SubjectsDataComponent } from './components/subjects-data/subjects-data.component';

//table components
import { SubjectTableComponent } from './components/subject-table/subject-table.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';
import { GenderTableComponent } from './components/gender-table/gender-table.component';
import { GraduatedTableComponent } from './components/graduated-table/graduated-table.component';

const routes: Routes = [
  // general
  {path: ' ' , redirectTo: '/home'},
  {path: 'home' , component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'admin_login', component: AdminLoginComponent, canActivate: [LoginGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuardService]},

  // dashboard
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'student/general', component: StudentComponent, canActivate: [AuthGuardService]},
  {path: 'student/work', component: WorkComponent, canActivate: [AuthGuardService]},
  {path: 'student/gender', component: GenderComponent, canActivate: [AuthGuardService]},
  {path: 'student/graduated', component: GraduatedComponent , canActivate: [AuthGuardService]},
  {path: 'subject/general', component: SubjectComponent , canActivate: [AuthGuardService]},
  {path: 'subject/gpa', component: GpaComponent , canActivate: [AuthGuardService]},
  {path: 'score/teacher', component: ScoreComponent , canActivate: [AuthGuardService]},

  // table
  {path: 'table/student', component: StudentTableComponent, canActivate: [AuthGuardService]},
  {path: 'table/work', component: WorkTableComponent, canActivate: [AuthGuardService]},
  {path: 'table/gender', component: GenderTableComponent, canActivate: [AuthGuardService]},
  {path: 'table/graduated', component: GraduatedTableComponent , canActivate: [AuthGuardService]},
  {path: 'table/subject', component: SubjectTableComponent , canActivate: [AuthGuardService]},
  {path: 'table/score', component: ScoreTableComponent , canActivate: [AuthGuardService]},

  // user control
  {path: 'user', component: UserComponent , canActivate: [AuthGuardService]},
  {path: 'password', component: PasswordComponent , canActivate: [AuthGuardService]},

  // admin section
  {path: 'admin/analysis', component: AnalysisComponent , canActivate: [AdminGuardService]},
  {path: 'admin/student', component: StudentDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/gender', component: GenderDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/graduated', component: GraduatedDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/work', component: WorkDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/score', component: ScoreDataComponent , canActivate: [AdminGuardService]},
  {path: 'admin/subjects', component: SubjectsDataComponent , canActivate: [AdminGuardService]},

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