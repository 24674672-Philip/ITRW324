import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../../services/server.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-wallet-nav',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponentNav implements OnInit {

  balance:number = 0;
  constructor(private serverService: ServerService,
              private authService: AuthService) { }

  ngOnInit() {
    //TODO: get balance of user
  }

}
