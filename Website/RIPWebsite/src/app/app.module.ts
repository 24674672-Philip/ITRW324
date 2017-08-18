import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BannerComponent } from './loginComponents/banner/banner.component';
import { InputformComponent } from './loginComponents/inputform/inputform.component';
import { ServerstatusComponent } from './loginComponents/serverstatus/serverstatus.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    InputformComponent,
    ServerstatusComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
