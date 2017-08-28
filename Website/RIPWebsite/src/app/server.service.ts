import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";


@Injectable()
export class ServerService {

  url: string = 'http://52.15.226.85:8080/api/';
  constructor(private http: Http) { }


  login(username: string, password: string, callback){
    let result = 'unauthed';
    let loginString = 'name-'+username+'-pass-'+password;
    const header = new Headers({'user_details':loginString})
    let returnString = 'Failed';
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

  register(email: string, username: string, password: string ){
    let headers: Headers = new Headers([{'username':username}, {'password': password}, {'email':email}]);
    this.http.post(this.url+'register', null, {headers: headers})
      .subscribe();
  }

}
