import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { PersonalService } from '../../master-services/personal/personal.service';

@Component({
  selector: 'app-master-technician-forklift-report',
  templateUrl: './master-technician-forklift-report.component.html',
  styleUrls: ['./master-technician-forklift-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterTechnicianForkliftReportComponent implements OnInit {

  rowsWorkCopi:any
  rowsWork: any;
  rowtodelete:any;

  constructor(private router:Router, private personalServices:PersonalService) {
    this.getForkliftReport();
   }

   getForkliftReport() {
    this.personalServices.getForkliftReport().then(data => {
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
        this.rowsWorkCopi =resp.data
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


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val == "") {
      this.rowsWork = this.rowsWorkCopi;
    } else {
      this.filter(val);
    }

    // update the rows
  }

  filter(input:any){
    this.personalServices.getForkliftReportfilter(input).then(data => {
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

  redirecttodetails(){
    this.router.navigateByUrl('maintenance/registerForkliftReport');
  }

  goToTpdateView(row:any){
    console.log(row.id);
    this.router.navigateByUrl('maintenance/updateForkliftReport/'+row.id);
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
        this.personalServices.deleteForkliftReport(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','ocurrio un error durante el procesado',"error");
          }else{
            this.generalAlert('Reporte eliminado','Reporte eliminado correctamente','success');
            this.getForkliftReport();
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


  ngOnInit() {
  }

}
