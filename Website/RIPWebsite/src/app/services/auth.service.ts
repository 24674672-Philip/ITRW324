import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class AuthService {

  @Output() isLoggedIn = new EventEmitter<boolean>();
  private authToken: string;
  private username: string;
  private fName: string;
  private lName: string;
  private email: string;
  private userId: number;
  private userBalance: number = 0;


  constructor() { }

  setAuthToken(token: string){
    this.authToken = token;
  }

  setUserbalance(coins: number){
    this.userBalance = coins;
  }

  getUserBalanca(): number{
    return this.userBalance;
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

  setUserID(userid: number){
    this.userId = userid;
  }

  getUserId(): number{
    return this.userId
  }

  signOut(){
    this.setAuthToken(null);
    this.setUsername(null);
    this.setLName(null);
    this.setFName(null);
    this.setEmail(null);
  }

  isAuthenticated(){
    if(this.authToken == null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
}
