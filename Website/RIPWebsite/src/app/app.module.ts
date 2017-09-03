import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from "@angular/http";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BannerComponent } from './loginComponents/banner/banner.component';
import {RegisterInputFormComponent} from './loginComponents/register-inputform/register-inputform.component';
import { ServerstatusComponent } from './loginComponents/serverstatus/serverstatus.component';
import { NavBarComponent } from './ripComponents/home-container/nav-bar/nav-bar.component';
import { MusicListComponent } from './ripComponents/home-container/music-list/music-list.component';
import { MusicItemComponent } from './ripComponents/home-container/music-list/music-item/music-item.component';
import { HomeContainerComponent } from './ripComponents/home-container/home-container.component';
import { ServerService } from "./services/server.service";
import { FormsModule } from "@angular/forms";
import { RegisterContainerComponent } from './loginComponents/register-container/register-container.component';
import { LoginContainerComponent } from "./loginComponents/login-container/login-container.component";
import { Routes, RouterModule } from "@angular/router";
import {AuthService} from "./services/auth.service";



const router: Routes = [
  {path: '', component: LoginContainerComponent},
  {path: 'register', component: RegisterContainerComponent},
  {path: 'home', component: HomeContainerComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    RegisterInputFormComponent,
    ServerstatusComponent,
    NavBarComponent,
    MusicListComponent,
    MusicItemComponent,
    HomeContainerComponent,
    RegisterContainerComponent,
    LoginContainerComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router),
  ],
  providers: [
    ServerService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
