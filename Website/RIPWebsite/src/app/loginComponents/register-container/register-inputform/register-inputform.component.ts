import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../services/server.service";
import {Router} from "@angular/router";

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
  emailAvailable:boolean;
  usernameAvailable: boolean;


  constructor(private serverService: ServerService, private router: Router) {
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
    this.emailAvailable=true;
    this.usernameAvailable=true;

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
    if(this.passwordValid && this.emailValid && this.emailAvailable && this.usernameAvailable && this.noFieldsNull()){
      return true
    }
    return false;
  }



//This code is needed for the login inputform and not for the register form
  registerClicked(){
    this.serverService.register(this.fName,this.lName,this.dob,this.country,this.city,
      this.adLine1,this.adLine2,this.postal,this.email,this.username,this.password,(response: JSON)=>
      {
        if(response['registered'] != 'Success!'){
          this.registerFailed();
        }
        else{
          this.registerSuccess();
        }
      });
  }

  registerSuccess(){
    this.success = true;
    this.router.navigate(['']); //Navigates back to the login page for the user to log in after verifying email address

  }

  registerFailed(){

  }

  checkUsername(){
    this.serverService.checkUsernameAvailibility(this.username, (response)=>{
      if(response['username'] == 'available'){
        this.usernameAvailable = true;
      }
      else{
        this.usernameAvailable = false;
      }
    });
  }
  checkEmail(){
    this.serverService.checkEmailAvailibility(this.email, (response)=>{
      if(response['email'] == 'available'){
        this.emailAvailable = true;
      }
      else{
        this.emailAvailable = false;
      }
    });
  }

  noFieldsNull(): boolean{
    if(this.email == '' ||
      this.fName== '' ||
      this.lName== '' ||
      this.dob== '' ||
      this.country== '' ||
      this.city== '' ||
      this.postal== '' ||
      this.adLine1== '' ||
      this.adLine2== '' ||
      this.username== '' ||
      this.password== '' ||
      this.confirmPassword== ''){
      return false;
    }else{
      return true;
    }
  }

}
