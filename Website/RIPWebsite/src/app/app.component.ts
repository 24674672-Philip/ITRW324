import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private authService: AuthService,
              private activeRoute: ActivatedRoute){
    this.authService.isLoggedIn.subscribe((event)=> this.isLoggedIn = event);
    this.activeRoute.params.subscribe((params)=>{
      if(params.toString() =='login' || params.toString() == 'register'){
      this.authService.isLoggedIn.emit(false);
    }

  });
  }

}
