import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: "app-master-tickets",
  templateUrl: "./master-tickets.component.html",
  styleUrls: [
    "./master-tickets.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
    
  ],
})
export class MasterTicketsComponent implements OnInit {



  constructor(private router:Router) {
   }



  ngOnInit() {
  }

}

