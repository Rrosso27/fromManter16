import { Component, OnInit } from '@angular/core';
import { StevedoreService } from '../../master-services/stevedore/stevedore.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-master-stevedore',
  templateUrl: './master-stevedore.component.html',
  styleUrls: ['./master-stevedore.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterStevedoreComponent implements OnInit {

  rowsWork: any;
  rowtodelete:any;

  constructor(private stevedoreService:StevedoreService,  private router:Router) {
    this.getWorks();
  }

  ngOnInit() {
  }

  getWorks() {
    this.stevedoreService.getStevedore().then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        this.rowsWork = resp.data;
        console.log( this.rowsWork);
    }
    }).catch(error => {
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }

  redirecttodetails(){
    this.router.navigateByUrl('maintenance/stevedoresRegister');
  }

  goToTpdateView(workrow:any){
    console.log(workrow.description);
    this.router.navigateByUrl('maintenance/stevedoresUpdate/'+workrow.id) 
  }
  deleteWorkHeader(workrow:any){
    swal({
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
        this.stevedoreService.deleteStevedore(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','ocurrio un error durante el procesado',"error");
          }else{
            if(resp.indicator==0){
              this.generalAlert('Estibador eliminada','Estibador eliminada correctamente','success');
              this.getWorks();
            }else{
              this.generalAlert('Error','Esta Estibador tiene asignado componentes',"error");
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
    swal({
      title:title,
      text:text,
      type:type
    })
  }

  loader(){
    swal({
      title:"Procesando información",
      allowEscapeKey:false,
      allowOutsideClick:false
    });
    swal.showLoading();
  }

}
