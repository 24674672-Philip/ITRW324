import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-inputform',
  templateUrl: './login-inputform.component.html',
  styleUrls: ['./login-inputform.component.css']
})
export class LoginInputformComponent implements OnInit {

  username: string;
  password: string;

  constructor(private serverService: ServerService, private authService: AuthService) {
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
    this.serverService.login(this.username,this.password,(response)=>{
      if(response['login'] == 'Success!'){
        this.loginSuccess(response);
      }else if(response['Login']=='Failed'){
        this.loginFailed();
      }
    });
  }

  loginSuccess(response){
    this.authService.setAuthToken('bearer '+response['token']);
    this.authService.setEmail(response['email']);
    this.authService.setFName(response['fname']);
    this.authService.setLName(response['lname']);
    this.authService.setUsername(response['user']);
    console.log('Login Success')

  }

  loginFailed(){

  }



}
