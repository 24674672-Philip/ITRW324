import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from "@angular/http";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BannerComponent } from './loginComponents/banner/banner.component';
import { RegisterInputFormComponent} from './loginComponents/register-container/register-inputform/register-inputform.component';
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
import { AuthService} from "./services/auth.service";
import { LoginInputformComponent } from './loginComponents/login-container/login-inputform/login-inputform.component';
import { PopupShadowDirective } from './directives/popup-shadow.directive';
import { DropdowntoggleDirective } from './directives/dropdowntoggle.directive';
import { MusicFooterComponent } from './ripComponents/music-footer/music-footer.component';
import { MusicPlayerService } from "./services/music-player.service";
import { ArtistsContainerComponent } from './ripComponents/artists-container/artists-container.component';
import { AlbumContainerComponent } from './ripComponents/album-container/album-container.component';
import { AlbumDescriptionComponent } from './ripComponents/album-container/album-description/album-description.component';
import { TrackListItemComponent } from './ripComponents/album-container/album-description/track-list-item/track-list-item.component';
import { LandingPageContainerComponent } from './landing-page/landing-page-container/landing-page-container.component';
import { EmailSuccessAlertComponent } from './email-confirmation-alert/email-success-alert/email-success-alert.component';
import { EmailWarningAlertComponent } from './email-confirmation-alert/email-warning-alert/email-warning-alert.component';

const router: Routes = [
  {path: '', component: LandingPageContainerComponent},
  {path: 'login', component: LoginContainerComponent},
  {path: 'register', component: RegisterContainerComponent},
  {path: 'home', component: HomeContainerComponent},
  {path: 'artist', component: ArtistsContainerComponent},
  {path: 'album', component: AlbumContainerComponent}
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
    LoginInputformComponent,
    PopupShadowDirective,
    DropdowntoggleDirective,
    MusicFooterComponent,
    ArtistsContainerComponent,
    AlbumContainerComponent,
    AlbumDescriptionComponent,
    TrackListItemComponent,
    LandingPageContainerComponent,
    EmailSuccessAlertComponent,
    EmailWarningAlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router),
  ],
  providers: [
    ServerService,
    AuthService,
    MusicPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
