import { Component, OnInit,Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import { HorometroService } from "../../master-services/horometro/horometro.service";
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { inputs } from '@syncfusion/ej2-angular-schedule/src/recurrence-editor/recurrenceeditor.component';
import { UserService } from '../../master-services/User/user.service';


@Component({
  selector: 'app-master-horometro',
  templateUrl: './master-horometro.component.html',
  styleUrls: ['./master-horometro.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterHorometroComponent implements OnInit {

  myFormUpdate: FormGroup;
  submitted = false;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;
  currentrow:any;
  switchCreate: any = true;
  switchUpdate: any = true;
  change: any = true;
  active: any = false;
  inactive: any = false;
  enabledUpdated: any = false;

  // ejemplo
  filterIndicatorText: any = false;
  filterIndicatorCheck: any = false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  customers: any;

  selectedBusinessId: any = 0;
  selectedOfficeId: any = 0;
  customerOffices: any = 0;
  userCustomer: boolean = false;
  user_id: any;
  @Input()
  public  horometroCurrent=0;;
  constructor(private restService: RestService, private router: Router,private forkliftService: ForkliftService,
     private horometroservice:HorometroService, private userService: UserService) {
      this.user_id = Number(localStorage.getItem('userid'));
    if(Number(localStorage.getItem('profile')) == 6 || Number(localStorage.getItem('profile')) == 7){

      this.getCustomerUser(this.user_id);
      this.userCustomer = true;
    }else{
      this.loadingData();
      this.getCustomers();
    }


    const horometroUpdate = new FormControl('', Validators.required);


    this.myFormUpdate = new FormGroup({
      horometroUpdate: horometroUpdate
    });
   }
   getCustomerUser(id: any) {
    this.userService.getUserCustomer(id).then(data => {
      const resp: any = data;
      this.customers = resp.data;
      // console.log(this.customers)
    }).catch(error => {
      console.log(error);
    });
  }

  getBranchOfficeUser() {
    Swal.fire({
      title: 'Validando información ...',
      text:'Cargando Sedes',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.userService.getBranchUser(this.selectedBusinessId,this.user_id).then(data => {
      const resp: any = data;
      this.customerOffices = resp.data;
      // console.log(this.customers)
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


   loadingData() {
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.forkliftService.getForklifts().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }
   updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
      console.log('vacio');
      this.filterIndicatorText = false;
      this.rowsTemp = this.rowStatic;
    }

    // this.filterIndicatorCheck = true;
    if (this.inactive === true ||  this.active === true) {
      this.rowsTemp = this.rowsTempCheck;
    }
    const temp = this.rowsTemp.filter(function(d:any) {
      return d.brand_description.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (val !== '') {
      this.filterIndicatorText = true;
      this.rowsTempText = temp;
    }

    // update the rows
    this.rowsClient = temp;

  }


  updateFilterActiveInactive(active: string) {
    const val = active;

    // filter our data

    if (this.filterIndicatorText === true) {
      this.rowsTemp = this.rowsTempText;
    } else {
      console.log('vacio por este lado');
      this.rowsTemp = this.rowStatic;
    }

    const temp = this.rowsTemp.filter(function(d:any) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows

    if (this.inactive === true ||  this.active === true) {
      this.rowsTempCheck = temp;
      this.filterIndicatorCheck = true;
    }

    this.rowsClient = temp;
  }

   getCustomers() {
    this.restService.getCustomer().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.customers  = resp.data;
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }

    getCustomersForklift(idCustomer:number) {
    this.forkliftService.getForkliftsCustomer(idCustomer).then(data => {
      const resp: any = data;
      console.log('forklifts');
      console.log(data);
      Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }


   getBranchOfficeForklift(idBranch:number) {
    this.forkliftService.getForkliftsBranch(idBranch).then(data => {
      const resp: any = data;
      console.log('forklifts branch');
      console.log(data);
     Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }

   getCustomerOffice() {
    console.log(this.selectedBusinessId);
    this.getCustomersForklift(this.selectedBusinessId);
    this.restService. getCustomerOffice(this.selectedBusinessId).then(data => {
     const resp: any = data;
     console.log('ole ole');
     console.log(resp);
     this.customerOffices = resp.data_branchoffices;
     Swal.close();
   }).catch(error => {
     console.log(error);
   });

  }

  getOfficeForklift() {
   this.getBranchOfficeForklift(this.selectedOfficeId);
  }

  onChangeCreate(check: any) {
   this.change = check;
    console.log(check);
  }

  onChangeUpdate(check: any) {
    this.switchUpdate = check;
    this.enabledUpdated = check;

    console.log(check);
  }

  onChangeActive(d:any) {
    let indice;
    if (this.active === false ) {
      this.active = true;
      if (this.inactive === true ) {
        indice = '';
      } else {
        indice = '0';
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.active = false;
      if (this.inactive === true ) {
        indice = '1';
      } else {
        indice = '';
      }
      this.updateFilterActiveInactive(indice);
    }
  }


  onChangeInactive(d:any) {
    let indice;
    if (this.inactive === false ) {
      this.inactive = true;
      if (this.active === true ) {
        indice = '';
      } else {
        indice = '1';
      }
      this.updateFilterActiveInactive(indice);
    } else {
      this.inactive = false;
      if (this.active === true ) {
        indice = '0';
      } else {
        indice = '';
      }
      this.updateFilterActiveInactive(indice);
    }
  }

updateForklift(forklift:any) {
  console.log(forklift);
  this.router.navigateByUrl('maintenance/forkliftUpdate/' + forklift.id);
}



  get checkFormUpdate() { return this.myFormUpdate.controls; }


  sendForklift() {
    this.router.navigateByUrl('/maintenance/registerForklift');
  }

  ngOnInit() {
  }

  blockAgents( vadr: any) {
   console.log(vadr);
  }


  updateHorometro(row:any){
    this.currentrow=row;
    this.horometroCurrent=row.h_current;
    document.getElementById('uploadHorometro')?.click();
  }

  updatehorometroCurrent(valor:number,row: any){
    console.log(this.myFormUpdate.get('horometroUpdate'));
    this.submitted = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.horometroservice.updateHorometer(this.currentrow.id, this.myFormUpdate.get('horometroUpdate')?.value,this.user_id)
    .then(data => {
      const resp: any = data;
      console.log(this.currentrow.id+','+ this.myFormUpdate.get('horometroUpdate')?.value+','+this.user_id);
      console.log(JSON.stringify(resp));
      if (resp.success === false) {
        Swal.fire({
          title: 'Error',
          text: 'Este horometro no se puede actualizar',
          icon: 'error'
         });
      } else {
     document.getElementById( 'createBrandHide')?.click();
     this.loadingData();
     Swal.fire({
      title: 'Horometro actualizado',
      icon: 'success'
     });
    }
    }).catch(error => {
      console.log(error);
    });
    }
  }


}
