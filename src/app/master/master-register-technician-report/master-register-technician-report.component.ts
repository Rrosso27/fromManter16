import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PersonalService } from '../../master-services/personal/personal.service';

@Component({
  selector: 'app-master-register-technician-report',
  templateUrl: './master-register-technician-report.component.html',
  styleUrls: ['./master-register-technician-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterRegisterTechnicianReportComponent implements OnInit {


  title:string = '';
  hours:number = 0;
  observation:string = '';

  headerinfo:any;
  constructor( private router: Router,  private personalServices:PersonalService) { }


  registerheader(){
    console.log(this.title);
    if ((this.title!=null) || (this.title!="") || (this.hours==null)) {
      Swal.fire({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      this.personalServices.createReportTechnician(this.title,this.hours,this.observation).then(data=>{
        const resp:any=data;
        console.log(data);
        this.headerinfo=resp.data;
        console.log("header information");
        console.log(this.headerinfo)
        Swal.close();
        this.router.navigateByUrl('maintenance/reportUpdate/'+this.headerinfo.id);
      }).catch(err=>{

        console.log(err);
        this.generalAlert("Ha ocurrido un herror","Ocurrio un error durante la ecucion","error");
      });
    }else{
      this.generalAlert("Ha ocurrido un herror","Complete todos los campos obligatorios","error");
    }
  }

  generalAlert(title:string,message:string,type:any){
    Swal.fire({
      title:title,
      text: message,
      icon: type
     });
  }

  ngOnInit() {
  }
}
