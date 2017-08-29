import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css']
})
export class InputformComponent implements OnInit {
  email : string;
  username: string;
  password: string;
  confirmPassword: string;
  token : string;
  success = false;

  constructor(private serverService: ServerService) {
    this.username='';
    this.email='';
    this.password='';
    this.confirmPassword='';

  }

  ngOnInit() {

  }

//This code is needed for the login inputform and not for the register form
  loginClicked(){

    this.serverService.login(this.username, this.password, (response)=>{
      if(response['login'] === 'Success!'){
        this.loginSuccess('bearer '+response['token'].toString());
      }else{
        this.loginFailed();
      }
    });
  }

  loginSuccess(token: string){
    this.success = true;
    this.token = token;
    console.log('Login was successful'+' '+ token);
    this.serverService.protected(this.token);
  }

  loginFailed(){

  }
}
