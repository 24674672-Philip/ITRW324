import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";


@Injectable()
export class ServerService {

  url: string = 'http://52.211.85.57:8080/api/';
  constructor(private http: Http,
              private http2: HttpClient) { }


  login(username: string, password: string, callback){
    const header = new Headers();
    header.set('username',username);
    header.append('password', Md5.hashAsciiStr(password,false).toString());
    console.log(header.values());
    this.http.post(this.url+'login', null, { headers: header})
      .subscribe(
        (response) => callback(response.json())
        ,
        (error) => callback(error.json()));
  }

  register(fname: string, lname: string, birthdate: string, country: string, city: string, adressline1: string
    ,addressline2: string,postalcode: string, email: string, username: string, password: string, callback){
    let userHeaders: Headers = new Headers();
    userHeaders.set('fname',fname.trim());
    userHeaders.append('lname',lname.trim());
    userHeaders.append('username',username.trim());
    userHeaders.append('email',email);
    userHeaders.append('password',Md5.hashAsciiStr(password,false).toString());
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

  getTopSongs(page_num:number, callback){
    this.http.post(this.url+'getsongs', null, {headers: new Headers({'page':page_num})})
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

  getAlbumSongs(id: string, callback){
    let headers = new Headers();
    headers.append('albumid',id);
    this.http.post(this.url +'getalbumsongs',null,{headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      );
  }

  getUserAlbumSongs(id: string, callback){
    let headers = new Headers();
    headers.append('albumid',id);
    this.http.post(this.url +'getuseralbumsongs',null,{headers: headers})
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

  getTopArtists(page: number, callback){
    let headers = new Headers();
    headers.append('page',page.toString());
    this.http.post(this.url+'getartists',null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json())
      );
  }

  getTopAlbums(page: number, callback){
    let headers = new Headers();
    headers.append('page',page.toString());
    this.http.post(this.url+'getalbums',null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json())
      );
  }

  getArtistByID(id: string, callback){
    let headers = new Headers();
    headers.append('artistid',id);
    this.http.post(this.url+'getartist',null,{headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      );
  }

  getArtistByName(name: string, callback){
    let headers = new Headers();
    headers.append('artistname',name);
    this.http.post(this.url+'getartist',null,{headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      );
  }

  editUserBio(username: string, token: string, bio: string, callback){
    let headers = new Headers();
    headers.append('username',username);
    headers.append('bio',bio);
    headers.append('authentication', 'bearer '+token);
    this.http.post(this.url+'edituserbio',null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json())
      )
  }

  getAverageSongCost(callback){
    this.http.get(this.url +'getavgsongcost')
      .subscribe(
        (response) => callback(response.json())
      );
  }

  getAverageAlbumCost(callback){
    this.http.get(this.url+'getavgalbumcost')
      .subscribe((response=>{
        callback(response.json())
      }));
  }

  getUserbalance(username: string, token: string, callback){
    let headers = new Headers();
    headers.append('username',username);
    headers.append('authentication','bearer '+token);
    this.http.get(this.url+'userbalance',{headers:headers})
      .subscribe((response)=>{
        callback(response.json())
      });
  }

  searchSongs(searchTerm: string, page: number, callback){
    let headers = new Headers();
    headers.append('searchterm', searchTerm);
    headers.append('page', page.toString());
    this.http.post(this.url + 'searchsongs',null, {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      )
  }

  searchArtists(searchTerm: string, page: number, callback){
    let headers = new Headers();
    headers.append('searchterm', searchTerm);
    headers.append('page', page.toString());
    this.http.post(this.url + 'searchartists',null, {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      )
  }

  searchAlbums(searchTerm: string, page: number, callback){
    let headers = new Headers();
    headers.append('searchterm', searchTerm);
    headers.append('page', page.toString());
    this.http.post(this.url + 'searchalbums',null, {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      )
  }

  uploadAlbum(formData: FormData,album_title: string,length:number, username: string,  callback, onProgress){
    const req = new HttpRequest('POST',this.url+'uploadalbum',
                                formData,
                                {headers: new HttpHeaders().set('title', album_title)
                                  .set('length', length.toString())
                                  .set('username', username),
                                reportProgress: true});
    this.http2.request(req)
      .subscribe(
        (event)=>{
          if(event.type == HttpEventType.UploadProgress){
            const percentDone = Math.round(100 * event.loaded / event.total);
            onProgress(percentDone);
          }else if(event instanceof HttpResponse){
            callback(event.body['result']);
          }
        }
      )
  }

  createAlbum(albumName: string, userid:number, token:string, callback){
    let headers = new Headers();
    headers.append('authentication','bearer '+ token);
    headers.append('albumname',albumName);
    headers.append('userid',userid.toString());
    this.http.post(this.url+'createalbum',null, {headers: headers})
      .subscribe(
        (response)=>callback(response.json())
      )
  }

  createSongs(title: string, explicit: string, albumid: number, userid: number, file_name: string, token: string,price: number, callback){
    let newExplicit: number;
    if(explicit=='true'){
      newExplicit=1;
    }else{
      newExplicit=0;
    }

    let headers = new Headers();
    headers.append('title', title);
    headers.append('explicit', newExplicit.toString());
    headers.append('albumid', albumid.toString());
    headers.append('userid', userid.toString());
    headers.append('file_name', file_name);
    headers.append('authentication','bearer '+ token);
    headers.append('price', price.toString());

    this.http.post(this.url+'createsong', null, {headers: headers})
      .subscribe((response)=>{
      callback(response.json())
      });
  }

  releaseAlbum(albumid: number, token: string, callback){
    let headers = new Headers();
    headers.append('authentication','bearer '+token);
    headers.append('id', albumid.toString());

    this.http.post(this.url+'releasealbum', null, {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      )
  }

  isPurchased(userid: number, songid: number, token: string, callback) {
    let headers = new Headers();
    headers.append('authentication', 'bearer ' + token);
    headers.append('userid', userid.toString());
    headers.append('songid', songid.toString());

    this.http.post(this.url+'ispurchased', null, {headers:headers})
      .subscribe(
        (response)=> callback(response.json())
      )
  }

  buySong(userid: number, songid: number, price: number, artistid:number,token: string, callback){
    let headers = new Headers();
    headers.append('userid', userid.toString());
    headers.append('songid', songid.toString());
    headers.append('price', price.toString());
    headers.append('artistid', artistid.toString());
    headers.append('authentication', 'bearer '+token)
    this.http.post(this.url+'buysongs', null,{headers:headers})
      .subscribe(
        (response)=>{callback(response.json())}
      );
  }


  buyCoins(userid: string, amount: number, token: string, callback){
    let headers = new Headers();
    headers.append('userid',userid.toString());
    headers.append('coins', amount.toString());
    headers.append('authentication', 'bearer '+token);
    this.http.post(this.url+'addtokens', null, {headers: headers})
      .subscribe(
        (response)=> callback(response.json())
      )

    //addtokens
  }

  uploadProfilePic(formData: FormData, userid: number, callback){
    let headers = new Headers();
    headers.append('userid', userid.toString());
    headers.append('type', 'users');

    this.http.post(this.url+'uploadimage', formData, {headers: headers})
      .subscribe(
        (response)=> callback(response.json)
      )
  }


}
