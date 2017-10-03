import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-inputform',
  templateUrl: './login-inputform.component.html',
  styleUrls: ['./login-inputform.component.css']
})
export class LoginInputformComponent implements OnInit {
//TODO: fix ugly alerts when login was nog successful
  username: string;
  password: string;
  loginSuccessFlag: boolean;
  loginFailedFlag: boolean;
  loginNotVerifiedFlag: boolean;
  verificationSent: boolean;


  constructor(private serverService: ServerService, private authService: AuthService, private router: Router) {
    this.username = '';
    this.password='';
  }

  ngOnInit() {
  }

  validate(): boolean{
    if(this.username != '' && this.password != ''){
      return true;
    }
    else{
      return false;
    }
  }

  login(){
    this.loginSuccessFlag = false;
    this.loginNotVerifiedFlag = false;
    this.loginFailedFlag = false;
    this.serverService.login(this.username,this.password,(response)=>{
      if(response['login'] == 'success'){
        this.loginSuccess(response);
      }else if(response['login'] == 'failed'){
        this.loginFailed();
      }else if(response['login'] == 'email not registered'){
        this.emailNotRegistered(response);
      }
    });
  }

  loginSuccess(response){
    this.loginSuccessFlag = true;
    this.authService.setAuthToken(response['token'].toString());
    this.authService.setEmail(response['email'].toString());
    this.authService.setFName(response['fname'].toString());
    this.authService.setLName(response['lname'].toString());
    this.authService.setUsername(response['user'].toString());
    this.router.navigate(['home']);
    console.log('Login Success')
  }

  loginFailed(){
    this.loginFailedFlag = true;
  }

  emailNotRegistered(response: Response){
    this.authService.setUsername(response['username']);
    this.loginNotVerifiedFlag = true;
  }

  resendVerificationEmail(){
    this.serverService.resendEmail(this.authService.getUsername(), (response)=>{
      this.verificationSent = true;
      console.log(response);
      console.log(this.authService.toString());
    });
  }



}
