import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { NgChartsModule } from 'ng2-charts';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularWebStorageModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    IonicModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
