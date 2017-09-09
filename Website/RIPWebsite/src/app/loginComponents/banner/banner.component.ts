import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  action: string;

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  registerText(): string{
    if(this.router.url.includes('register')){
      return 'Login';
    }else{
      return 'Register';
    }
  }

  registerClicked(){
    if(this.router.url.includes('register')){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['register']);
    }
  }



}
