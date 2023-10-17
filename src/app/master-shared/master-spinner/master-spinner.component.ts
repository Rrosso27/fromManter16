import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-spinner',
  templateUrl: './master-spinner.component.html',
  styleUrls: ['./master-spinner.component.scss']
})
export class MasterSpinnerComponent implements OnInit {


  public load: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
