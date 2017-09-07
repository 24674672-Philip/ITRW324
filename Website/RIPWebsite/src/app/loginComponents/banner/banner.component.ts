import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  registering: boolean;
  action: string;

  constructor(private router: Router) {
    this.registering = false;
    this.action = 'Register'
  }

  ngOnInit() {
  }

  registerClicked(){



  }



}
