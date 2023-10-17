import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { PlatformsService } from '../../master-services/platforms/platforms.service';

@Component({
  selector: 'app-master-platforms',
  templateUrl: './master-platforms.component.html',
  styleUrls: ['./master-platforms.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterPlatformsComponent implements OnInit {

  rowsWork: any;
  rowtodelete:any;

  constructor(private platformsService:PlatformsService,  private router:Router) {
    this.getWorks();
  }

  ngOnInit() {
  }

  getWorks() {
    this.platformsService.getPlatforms().then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        console.log(data);
        this.rowsWork = resp.data;
        console.log( this.rowsWork);
    }
    }).catch(error => {
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });
  }

  redirecttodetails(){
    this.router.navigateByUrl('maintenance/platformsRegister');
  }

  goToTpdateView(workrow:any){
    console.log(workrow.description);
    this.router.navigateByUrl('maintenance/plataformsUpdate/'+workrow.id)
  }

  deleteWorkHeader(workrow:any){
    Swal.fire({
      title:"Confirmacion",
      text:"esta seguro que desea borrar este elemento?",
      cancelButtonText:"No",
      confirmButtonText:"Si",
      showCancelButton:true,
      showConfirmButton:true
    }).then(goingtodelete=>{
      if (goingtodelete.value) {
        this.loader();
        this.rowtodelete=workrow;
        console.log(this.rowtodelete);
        this.platformsService.deletePlatforms(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','ocurrio un error durante el procesado',"error");
          }else{
            if(resp.indicator==0){
              this.generalAlert('Mantenimiento eliminado','Mantenimiento eliminada correctamente','success');
              this.getWorks();
            }else{
              this.generalAlert('Error','Este mantenimiento tiene asignado componentes',"error");
            }
          }
        }).catch(err=>{
          console.log(err);
          this.generalAlert('Error','ocurrio un error durante el procesado',"error");
        });
      } else {
        console.log("proceso cancelado");
      }
    });
  }

  generalAlert(title:string,text:string,type:any){
    Swal.fire({
      title:title,
      text:text,
      icon:type
    })
  }

  loader(){
    Swal.fire({
      title:"Procesando información",
      allowEscapeKey:false,
      allowOutsideClick:false
    });
    Swal.showLoading();
  }
}
