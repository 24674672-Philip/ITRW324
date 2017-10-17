import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../../services/server.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  private balance:number;
  constructor(private serverService: ServerService,
              private authService: AuthService) { }

  ngOnInit() {
    //TODO: get balance of user
  }

}
