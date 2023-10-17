import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-master-payment-condition',
  templateUrl: './master-payment-condition.component.html',
  styleUrls: ['./master-payment-condition.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterPaymentConditionComponent implements OnInit {

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submitted :any= false;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;
  rows: any;
  a: any = 5;
  kilo: any;
  elementDelete: any;

  switchCreate = true;
  switchUpdate = true;
  change:any = true;
  active:any = false;
  inactive:any = false;
  enabledUpdated:any ;
  enabledcreated:any =true;
  filterIndicatorText:any = false;
  filterIndicatorCheck :any= false;

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
    const day = new FormControl('', Validators.required);
    const descriptionUpdate = new FormControl('', Validators.required);
    const dayUpdate = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      description: description,
      day: day
    });

    this.myFormUpdate = new FormGroup({
      descriptionUpdate: descriptionUpdate,
      dayUpdate: dayUpdate
    });
   }


   loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.restService.getPaymentConditions().then(data => {
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
   this.enabledcreated = check;
    console.log(check);
  }

  onChangeUpdate(check: any) {
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
  this.myFormUpdate.get('dayUpdate')?.setValue(brand.day);
  if (this.currentBrand.status === '0') {
    this.enabledUpdated = true;
  } else {
    this.enabledUpdated = false;
  }

  document.getElementById( 'uploadBrand')?.click();

}

   sendBrand() {
    console.log(this.myForm.get('day')?.value);
    console.log(this.myForm.get('description')?.value);
    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let statusTemp = 1;
    if (this.enabledcreated) {
      statusTemp = 0;
    }
    this.restService.createPayCondition(this.myForm.get('description')?.value.toUpperCase(),
     Number(this.myForm.get('day')?.value), statusTemp).then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta marca ya esta registrada',
          text: 'Esta marca no se puede registrar',
          icon: 'error'
         });
      } else {
        this.myForm.get('description')?.setValue('');
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
    this.submitted = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let statusTemp = 1;
    if (this.enabledUpdated) {
      statusTemp = 0;
    }
    console.log(this.myFormUpdate.get('dayUpdate')?.value);
    this.restService.updatePayCondition(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(),
    Number(this.myFormUpdate.get('dayUpdate')?.value), statusTemp)
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Error',
          text: 'Este metodo de pago no se puede actualizar',
          icon: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateBrandHide')?.click();
     this.loadingData();
     Swal.fire({
      title: 'Metodo de pago actualizado',
      icon: 'success'
     });
    }
    }).catch(error => {
      console.log(error);
    });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Este metodo de pago no se puede actualizar',
        icon: 'error'
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
          console.log(this.elementDelete);
          Swal.showLoading();
          this.restService.deletePayCondition(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Esta marca presenta problemas',
                text: 'Esta marca no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.loadingData();
           Swal.fire({
            title: 'Marca eliminada',
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
