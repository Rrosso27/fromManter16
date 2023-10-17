import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';

@Component({
  selector: 'app-master-maintenance-notification',
  templateUrl: './master-maintenance-notification.component.html',
  styleUrls: ['./master-maintenance-notification.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MasterMaintenanceNotificationComponent implements OnInit {

  days: number = 0;
  rowClient: any;

  constructor( private resumenesService: ResumenesService) {this.getDays() }

  getDays(){

    this.resumenesService.getNotificationDay().then(data => {
      const resp: any = data;
      console.log(data);
      this.rowClient = resp.data;
      Swal.close();
      if(resp.error){
        Swal.fire({
          title:'Oops',
          text: 'Hubo un error en al cargar el día.',
          icon: 'error'
          });
      }
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title:'Oops',
        text: 'Hubo un error en al cargar el día.',
        icon: 'error'
        });
    });
  }

  saveDay(){
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log(this.days);
    this.resumenesService.createNotificationDay(this.days).then(data => {
      const resp: any = data;
      console.log(data);
      // this.rowClient = resp.data;
      this.getDays();
      console.log(resp.error);
      Swal.close();
      if(resp.error){
        Swal.fire({
          title:'Oops',
          text: 'Hubo un error en al guardar el día.',
          icon: 'error'
          });
      }
      else{
        Swal.fire({
          title: 'Se ha guardado correctamente',
          icon: 'success'
        });
        document.getElementById('createBrandHide')?.click();
      }
    }).catch(error => {
      console.log(error);
      Swal.fire({
        title:'Oops',
        text: 'Hubo un error en al guardar el día.',
        icon: 'error'
        });
    });

  }

  assingNumber(){
    this.days = this.rowClient[0].day
  }

  ngOnInit() {
  }

}
