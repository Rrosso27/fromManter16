import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { PersonalService } from '../../master-services/personal/personal.service';
import { RestService } from '../../master-services/Rest/rest.service';

@Component({
  selector: 'app-master-register-technician-forklift-report',
  templateUrl: './master-register-technician-forklift-report.component.html',
  styleUrls: ['./master-register-technician-forklift-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterRegisterTechnicianForkliftReportComponent implements OnInit {

  selectedBusinessId: any = 0;
  selectedRegionalId:any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedReporId: any = 0;

  customers: any;
  regional: any;

  branchOffices: any;
  forklifts: any;
  report: any
  switchUpdate = false;

  headerinfo:any;
  consecutive:any;

  constructor(private restService: RestService, private personalServices:PersonalService, private router: Router,
    private forkliftService: ForkliftService) {
    this.getRegional();
    this.getReportTechnicians();
    this.getConsecutive();

   }


  getRegional(){
    this.restService.getRegionalAll().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.regional  = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomerRegionals() {
    this.restService.getRegionalCustomers(this.selectedRegionalId.id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.customers  = resp.data;

      //asignar valores customer;

    }).catch(error => {
      console.log(error);
    });
   }

  getReportTechnicians() {
    this.personalServices.getReportTechnician().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.report  = resp.data;

      //asignar valores customer;

    }).catch(error => {
      console.log(error);
    });
   }

  getReportTechnicianDetail() {
    this.personalServices.getReportTechnicianDetail(this.selectedReporId.id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.report  = resp.data;

      //asignar valores customer;

    }).catch(error => {
      console.log(error);
    });
   }



  getBranchOffices() {
    if(this.selectedBusinessId!=0){

    // Llenar información de cliente
    this.restService.getOffice(this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      console.log('oficinas: '+data);
      Swal.close();
      this.branchOffices  = resp.data;
    }).catch(error => {
      console.log(error);
    });


    }else{
      this.selectedBranchOfficeId=0;
      this.selectedForkliftId=0;
    }
  }

  getForklifs() {
    if(this.selectedBranchOfficeId!=0){
    console.log('this.selectedBusinessId.id');
    console.log(this.selectedBranchOfficeId.id);

  this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId.id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.forklifts  = resp.data;

    }).catch(error => {
      console.log(error);
    });
  }else{

  }
}

getConsecutive() {

  this.personalServices.getForkliftReportConsecutive().then(data => {
    const resp: any = data;
    console.log(data);
    Swal.close();
    this.consecutive  = resp.data;
    var date = new Date();

    let now = date.getFullYear();


    // 01, 02, 03, ... 10, 11, 12
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);


    let yearCosecutive=date.getFullYear().toString().substring(2,4);
    this.consecutive= Number(this.consecutive.consecutive)+1;
    this.consecutive = Number(yearCosecutive.toString()+month.toString()+this.consecutive.toString());
    console.log(this.consecutive);
    // this.rowsClient = resp.data;
    // this.rowStatic =  resp.data;
    // this.rowsTemp = resp.data;
    // console.log( this.rowsClient);
  }).catch(error => {
    console.log(error);
  });
 }

registerHeader(){
  // console.log(this.title);
  if ((this.selectedRegionalId!=0) || (this.selectedBusinessId!=0) || (this.selectedBranchOfficeId!=0)
   || (this.selectedForkliftId!=0) || this.selectedReporId != 0) {
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    // var date = new Date();
    this.personalServices.createReportForklift(this.consecutive,this.selectedRegionalId.id,this.selectedBusinessId.id,this.selectedBranchOfficeId.id,
      this.selectedForkliftId.id,this.selectedReporId.id).then(data=>{
      const resp:any=data;
      console.log(data);
      this.headerinfo=resp.data;
      this.personalServices.updateReportForkliftConsecutivo().then(data => {
        const resp: any = data;
        console.log(data);
        Swal.fire({
          title: 'Guardado con exito',
          icon: 'success'
         });
         console.log("header information");
         console.log(this.headerinfo)
         this.switchUpdate = true;
         Swal.close();

         this.router.navigateByUrl('maintenance/updateForkliftReport/'+this.headerinfo.id);

         console.log('llego hasta aqui');

        Swal.close();
        // this.rowsClient = resp.data;
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      }).catch(error => {
        Swal.fire({
          title: 'Se presento un problema, para guardar la asignación del reporte',
          icon: 'error'
         });
        console.log(error);
      });

    }).catch(err=>{

      console.log(err);
      this.generalAlert("Ha ocurrido un herror","Ocurrio un error durante la ecucion","error");
    });
  }else{
    this.generalAlert("Ha ocurrido un herror","Complete todos los campos obligatorios","error");
  }
}

generalAlert(title:string,text:string,type:any){
  Swal.fire({
    title:title,
    text:text,
    icon:type
  })
}

  ngOnInit() {
  }

}
