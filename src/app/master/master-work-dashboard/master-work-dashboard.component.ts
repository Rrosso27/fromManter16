import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { WorkService } from '../../master-services/Work/work.service';
import swal from 'sweetalert2';
import { UserInternalInterface } from '../../master-models/user-internal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-master-work-dashboard',
  templateUrl: './master-work-dashboard.component.html',
  styleUrls: ['./master-work-dashboard.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterWorkDashboardComponent implements OnInit {

  rowsWork: any;
  rowtodelete:any;
  constructor(private workService:WorkService,
              private router:Router
            ) {
              this.getWorks();
            }

  ngOnInit() {
  }

  getWorks() {
    this.workService.getWorks().then(data => {
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
    this.router.navigateByUrl('maintenance/work_details');
  }

  
  copyEstimate(row:any){
    console.log(row);
    swal({
      title: 'Estás seguro que deseas copiar la rutina?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
        this.copyRoutine(row);
        } else {
         // swal('Fail');
        }
      console.log(willDelete);
    });
  }


  copyRoutine(row: any){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log(row);
     this.workService.getCopy(row.id).then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();    
        this.getWorks();
        swal.close();
        this.router.navigateByUrl('maintenance/work_detailsUpdate/'+resp.data.id+'/'+resp.data.description+'/'+resp.data.hours+'/'+resp.data.observation);
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

  goToTpdateView(workrow:any){
    console.log(workrow.description);
    this.router.navigateByUrl('maintenance/work_detailsUpdate/'+workrow.id+'/'+workrow.description+'/'+workrow.hours+'/'+workrow.observation);
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
        this.workService.deleteWorkHeader(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','ocurrio un error durante el procesado',"error");
          }else{
            if(resp.indicator==0){
              this.generalAlert('Rutina eliminada','Rutina eliminada correctamente','success');
              this.getWorks();
            }else{
              this.generalAlert('Error','Esta rutina tiene asignado componentes',"error");
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
      title:"procesando informacion",
      allowEscapeKey:false,
      allowOutsideClick:false
    });
    swal.showLoading();
  }

}
