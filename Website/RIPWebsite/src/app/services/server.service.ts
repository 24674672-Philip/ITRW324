import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {HttpHeaders} from "@angular/common/http";


@Injectable()
export class ServerService {

  url: string = 'http://52.211.85.57:8080/api/';
  constructor(private http: Http) { }


  login(username: string, password: string, callback){
    const header = new Headers();
    header.set('username',username);
    header.append('password',password);

    console.log(header.keys());
    this.http.post(this.url+'login', null, { headers: header})
      .subscribe(
        (response) => callback(response.json())
        ,
        (error) => callback(error.json()));

  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Register transaction start

  register(fname: string, lname: string, birthdate: string, country: string, city: string, adressline1: string
    ,addressline2: string,postalcode: string, email: string, username: string, password: string, callback){
    let userHeaders: Headers = new Headers();
    userHeaders.set('fname',fname.trim());
    userHeaders.append('lname',lname.trim());
    userHeaders.append('username',username.trim());
    userHeaders.append('email',email);
    userHeaders.append('password',password);
    userHeaders.append('birthdate',birthdate);
    this.http.post(this.url+'registeruser', null, {headers: userHeaders})
      .subscribe(
        (response) =>{
          let resJson = response.json();
          let locationHeaders = new Headers();
          locationHeaders.append('userid',resJson['userid']);
          locationHeaders.append('country',country.trim());
          locationHeaders.append('city',city.trim());
          locationHeaders.append('addline1',adressline1.trim());
          locationHeaders.append('addline2',addressline2.trim());
          locationHeaders.append('postalcode',postalcode.trim());
          this.http.post(this.url+'registeraddress', null, {headers: locationHeaders})
            .subscribe(
              (response) => callback(response.json()),
              (error) => callback(error.json())
            );
        }
      )
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

  resendEmail(username: string, callback){
    let headers = new Headers();
    headers.set('username',username);
    this.http.post(this.url+'resendemail', null, {headers: headers})
      .subscribe(
        (response) => callback(response.json()),
        (error) => callback(error.json())
      );
  }

  getTopSongs(callback){
    this.http.post(this.url+'getsongs', null)
      .subscribe(
        (response) => callback(response.json())
      );
  }

  testServer(callback){
    this.http.get('http://52.211.85.57:8080/test', null)
      .subscribe(
        (response)=>callback(response.json())
      )
  }

  validateToken(){
    let headers = new Headers();
    headers.append("authentication","bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiUGhpbGlwIn0sImlhdCI6MTUwNzAyMTY2MX0.J-aLzyctvfAwz01UIm3tRtOcfdsfq28RiJvxhBdE2zA");
    this.http.get(this.url+"validtoken",{headers: headers})
      .subscribe(
        (response)=> console.log(response.json())
      );
  }

  getImage(imageType: string, id: number, callback){
    let headers = new Headers();
    headers.append('type',imageType);
    headers.append('id', id.toString());
    this.http.get(this.url+'getimagename', {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      );
  }

  upload(formData: FormData){
    this.http.post(this.url+'upload', formData,{headers: new Headers({'Content-type': 'undefined'})})
      .subscribe(
      (response)=> console.log(response)
    )
  }


}
