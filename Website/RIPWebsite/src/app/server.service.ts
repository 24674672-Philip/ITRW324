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

  register(fname: string, lname: string, birthdate: string, cellphone: string, country: string, city: string, adressline1: string
           ,addressline2: string,postalcode: string, email: string, username: string, password: string, callback ){
    let headers: Headers = new Headers();
    headers.set('fName',fname.trim());
    headers.append('lName',lname.trim());
    headers.append('username',username.trim());
    headers.append('email',email);//TODO: email validation on the input form component itself
    headers.append('password',password);
    headers.append('birthdate',birthdate);
    headers.append('cellphone',cellphone.trim());
    headers.append('country',country.trim());
    headers.append('city',city.trim());
    headers.append('addressline1',adressline1.trim());
    headers.append('addressline2',addressline2.trim());
    headers.append('postalcode',postalcode.trim());
    this.http.post(this.url+'register', null, {headers: headers})
      .subscribe();
  }

  protected(token : string){
    const header = new Headers();
    header.set('authentication', token);
    this.http.get(this.url+'protected', {headers: header})
      .subscribe(
        (response) => console.log(response)
      )
  }

}
