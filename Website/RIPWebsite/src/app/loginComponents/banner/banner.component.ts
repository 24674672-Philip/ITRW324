import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private actUrl: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

  }

  loginClicked(){
    if(this.actUrl.snapshot.toString().includes('login')){
    }else if(this.actUrl.snapshot.toString().includes('register')){
      this.router.navigate(['../login'])
    }else{
      this.router.navigate(['login']);
    }
  }

    registerClicked(){
      if(this.actUrl.snapshot.toString().includes('register')){
      }else if(this.actUrl.snapshot.toString().includes('login')){
        this.router.navigate(['../register'])
      }else{
        this.router.navigate(['register']);
      }
  }







}
