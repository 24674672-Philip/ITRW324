import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-landing-page-container',
  templateUrl: './landing-page-container.component.html',
  styleUrls: ['./landing-page-container.component.css']
})
export class LandingPageContainerComponent implements OnInit {

  constructor(private actUrl: ActivatedRoute, private router: Router) {
    
      }

  ngOnInit() {
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
