import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class AuthService {

  @Output() isLoggedIn = new EventEmitter<boolean>();
  private authToken: string;
  private username: string;
  private fName: string;
  private lName: string;
  private email: string;


  constructor() { }

  setAuthToken(token: string){
    this.authToken = token;
  }
  setUsername(username: string){
    this.username = username;
  }
  setFName(fName: string){
    this.fName = fName;
  }
  setLName(lName: string){
    this.lName = lName;
  }
  setEmail(email: string){
    this.email = email;
  }



  getAuthToken(){
    return this.authToken;
  }

  getUsername(){
    return this.username;
  }

  getLName(){
    return this.lName
  }

  getFName() {
    return this.fName;
  }

  getEmail(){
    return this.email;
  }




}
