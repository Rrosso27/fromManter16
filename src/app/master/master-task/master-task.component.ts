import { Component, OnInit,} from '@angular/core';
import { View } from "@syncfusion/ej2-angular-schedule";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-master-task',
  templateUrl: './master-task.component.html',
  styleUrls: ['./master-task.component.scss']
})
export class MasterTaskComponent implements OnInit {

  public setView:View='Month';
  constructor() { }

  ngOnInit() {
  }


}
