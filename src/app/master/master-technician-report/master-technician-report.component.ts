import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { PersonalService } from '../../master-services/personal/personal.service';

@Component({
  selector: 'app-master-technician-report',
  templateUrl: './master-technician-report.component.html',
  styleUrls: ['./master-technician-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterTechnicianReportComponent implements OnInit {


  rowsWork: any;
  rowsWorkCopi:any;
  rowtodelete:any;

  constructor(private router:Router, private personalServices:PersonalService) {
    this.getReport();
   }

   getReport() {
    this.personalServices.getReportTechnician().then(data => {
      const resp: any = data;
      console.log(data);
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        this.rowsWorkCopi = resp.data;
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
    this.router.navigateByUrl('maintenance/reportRegister');
  }

  goToTpdateView(row:any){
    console.log(row.id);
    this.router.navigateByUrl('maintenance/reportUpdate/'+row.id);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val == "") {
      console.log("hola");
      this.rowsWorkCopi = this.rowsWork;
    } else {
      console.log("chao");
      this.filter(val);
    }

    // update the rows
  }

  filter(input:any){
    this.personalServices.filter(input).then(data => {
      const resp: any = data;
      console.log(data);
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        this.rowsWork = resp.data;
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
        this.personalServices.deleteReportTechnician(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','Ocurrio un error durante el proceso',"error");
          }else{
            this.generalAlert('Reporte eliminada','Rutina eliminada correctamente','success');
            this.getReport();
          }
        }).catch(err=>{
          console.log(err);
          this.generalAlert('Error','Ocurrio un error durante el procesado',"error");
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


  ngOnInit() {
  }

}

