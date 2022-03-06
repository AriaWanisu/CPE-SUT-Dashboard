import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { NgChartsModule } from 'ng2-charts';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgxSelectModule } from 'ngx-select-ex';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingComponent } from './components/setting/setting.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DataService  } from './services/data.service';
import { HomeComponent } from './components/home/home.component';
import { GraduatedComponent } from './components/graduated/graduated.component';
import { StudentComponent } from './components/student/student.component';
import { WorkComponent } from './components/work/work.component';
import { GenderComponent } from './components/gender/gender.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ScoreComponent } from './components/score/score.component';
import { IonicModule } from '@ionic/angular';
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
import { StudentTableComponent } from './components/student-table/student-table.component';
import { GenderTableComponent } from './components/gender-table/gender-table.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { GraduatedTableComponent } from './components/graduated-table/graduated-table.component';
import { SubjectTableComponent } from './components/subject-table/subject-table.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SettingComponent,
    RegisterComponent,
    AdminLoginComponent,
    ChartComponent,
    DashboardComponent,
    NotFoundComponent,
    HomeComponent,
    GraduatedComponent,
    StudentComponent,
    WorkComponent,
    GenderComponent,
    SubjectComponent,
    ScoreComponent,
    UserComponent,
    PasswordComponent,
    AnalysisComponent,
    StudentDataComponent,
    GenderDataComponent,
    GraduatedDataComponent,
    WorkDataComponent,
    ScoreDataComponent,
    GpaComponent,
    SubjectsDataComponent,
    StudentTableComponent,
    GenderTableComponent,
    WorkTableComponent,
    GraduatedTableComponent,
    SubjectTableComponent,
    ScoreTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularWebStorageModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    IonicModule.forRoot(),
    NgxSummernoteModule,
    NgxSelectModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
