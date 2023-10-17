import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from '@angular/router';


@Component({
  selector: 'app-master-machine',
  templateUrl: './master-machine.component.html',
  styleUrls: ['./master-machine.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterMachineComponent implements OnInit {
  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submitted = false;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;

  switchCreate: any = true;
  switchUpdate: any = true;
  change: any = true;
  active : any= false;
  inactive: any = false;
  enabledUpdated : any= true;

  filterIndicatorText : any= false;
  filterIndicatorCheck : any= false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  constructor(private restService: RestService, private router: Router) {
  /*  Swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.restService.getBrands().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });*/

    this.loadingData();

    const description = new FormControl('', Validators.required);
    const descriptionUpdate = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      description: description
    });

    this.myFormUpdate = new FormGroup({
      descriptionUpdate: descriptionUpdate
    });
   }


   loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.restService.getMachines().then(data => {
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
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
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

updateBrand(brand:any) {
  console.log(brand);
  this.currentBrand = brand;
  console.log( this.currentBrand );
  this.myFormUpdate.get('descriptionUpdate')?.setValue(brand.description);
  if (this.currentBrand.status === '0') {
    this.enabledUpdated = true;
  } else {
    this.enabledUpdated = false;
  }

  document.getElementById( 'uploadBrand')?.click();

}

   sendBrand() {
    console.log(localStorage.getItem('token'));
    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let statusTemp = 0;
    if (this.enabledUpdated === true) {
      statusTemp = 0;
    } else {
      statusTemp = 1;
    }
    this.restService.createMachine(this.myForm.get('description')?.value.toUpperCase(), statusTemp).then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta maquina ya esta registrada',
          text: 'Esta maquina no se puede registrar',
          icon: 'error'
         });
      } else {
        this.myForm.get('description')?.setValue('');
     /*Swal({
      title: 'Marca agregada',
      type: 'success'
     });*/
   //   this.router.navigateByUrl('master/registerBrand');

   document.getElementById( 'createBrandHide')?.click();
   this.loadingData();
   Swal.fire({
    title: 'Marca agregada',
    icon: 'success'
   });
    }
    }).catch(error => {
      console.log(error);
    });
    }
  }

  sendUpdateBrand() {
    console.log(this.myFormUpdate.get('descriptionUpdate'));
    console.log(localStorage.getItem('token'));
    this.submitted = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let statusTemp = 1;
    if (this.enabledUpdated === true) {
      statusTemp = 0;
    } else {
      statusTemp = 1;
    }
    console.log(this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase() + ' ' + statusTemp);
    this.restService.updateMachine(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(), statusTemp)
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta maquina ya esta actualizada',
          text: 'Esta maquina no se puede actualizar',
          icon: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateBrandHide')?.click();
     this.loadingData();
     Swal.fire({
      title: 'Maquina actualizada',
      icon: 'success'
     });
    }
    }).catch(error => {
      console.log(error);
    });
    }
  }

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }


  deleteBrand(brand: any) {
    Swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = brand;
          console.log(brand);
          console.log(    this.elementDelete);
          Swal.showLoading();
          this.restService.deleteMachine(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Esta maquina presenta problemas',
                text: 'Esta maquina no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.loadingData();
           Swal.fire({
            title: 'Maquina eliminada',
            icon: 'success'
           });
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // Swal('Fail');
        }
      console.log(willDelete);
    });



  }

  ngOnInit() {
  }

  blockAgents( vadr: any) {
   console.log(vadr);
  }

}
