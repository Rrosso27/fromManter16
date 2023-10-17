import { Component, OnInit } from '@angular/core';
import { isBoolean } from 'util';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  isMobile:boolean;
  constructor() { 
    this.isMobile=false;
  }

  ngOnInit() {
   if (screen.width<780) {
     this.isMobile=true;
   }
  }

}
