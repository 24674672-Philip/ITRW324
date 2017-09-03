import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-register-inputform',
  templateUrl: './register-inputform.component.html',
  styleUrls: ['./register-inputform.component.css']
})
export class RegisterInputFormComponent implements OnInit {
  email : string;
  fName : string;
  lName : string;
  dob: string;
  country: string;
  city: string;
  postal: string;
  adLine1: string;
  adLine2: string;
  username: string;
  password: string;
  confirmPassword: string;
  success: boolean;
  passwordValid: boolean;
  emailValid: boolean;


  constructor(private serverService: ServerService) {
    this.username='';
    this.email='';
    this.password='';
    this.confirmPassword='';
    this.dob ='';
    this.postal='';
    this.adLine1 = '';
    this.adLine2 ='';
    this.success = false;
    this.passwordValid = false;
    this.emailValid = false;
    this.lName = '';
    this.fName = '';
    this.country = '';

  }

  ngOnInit() {

  }

  validateEmail(event: Event){
    let value = (<HTMLInputElement>event.target).value;
    if(value.includes('@')){
      if(value.includes('.')){
        this.emailValid = true;
      }
    }
    else{
      this.emailValid = false;
    }
  }

  validatePassword(event: Event){
    let value = (<HTMLInputElement>event.target).value;
    if(value.length>=8){
      this.passwordValid = true;
    }
    else{
      this.passwordValid = false;
    }
  }

  valid(): boolean{
    if(this.passwordValid && this.emailValid){
      return true
    }
    return false;
  }



//This code is needed for the login inputform and not for the register form
  registerClicked(){
  //TODO: Send register request to service and handle the response. Reroute user to login page
  }

}
