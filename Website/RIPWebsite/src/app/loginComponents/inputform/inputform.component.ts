import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css']
})
export class InputformComponent implements OnInit {
  BACKGROUNDIMAGE = 'background-image: url(/assets/shipwreck.jpg);';
  constructor() {
  }

  ngOnInit() {
  }

}
