import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";


@Injectable()
export class ServerService {

  url: string = 'http://52.15.226.85:8080/api/';
  constructor(private http: Http) { }


  login(username: string, password: string, callback){
    let result = 'unauthed';
    const header = new Headers();
    header.set('username',username);
    header.append('password',password);

    console.log(header.keys());
    this.http.post(this.url+'login', null, { headers: header})
      .subscribe(
        (response) => {
          result = response.json();
          callback(result);
        },
        (error) =>{
          result = error.json();
          callback(result);
        });

  }

  register(fname: string, lname: string, birthdate: string, country: string, city: string, adressline1: string
           ,addressline2: string,postalcode: string, email: string, username: string, password: string, callback ){
    let headers: Headers = new Headers();
    headers.set('fName',fname.trim());
    headers.append('lName',lname.trim());
    headers.append('username',username.trim());
    headers.append('email',email);
    headers.append('password',password);
    headers.append('birthdate',birthdate);
    headers.append('country',country.trim());
    headers.append('city',city.trim());
    headers.append('addressline1',adressline1.trim());
    headers.append('addressline2',addressline2.trim());
    headers.append('postalcode',postalcode.trim());
    this.http.post(this.url+'register', null, {headers: headers})
      .subscribe(
        (response) => callback(response.json()),
        (error) => callback(error.json())
      );
  }

  checkUsernameAvailibility(username: string, callback){
    let headers = new Headers();
    headers.set('username',username);
    this.http.post(this.url+'checkusername', null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json()),
        (error)=>callback(error.json())
      );

  }

  checkEmailAvailibility(email: string, callback){
    let headers = new Headers();
    headers.set('email',email);
    this.http.post(this.url+'checkemail', null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json()),
        (error)=>callback(error.json())
      );
  }

}
