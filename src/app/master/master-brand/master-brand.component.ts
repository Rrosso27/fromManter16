import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';



@Component({
  selector: 'app-master-brand',
  templateUrl: './master-brand.component.html',
  styleUrls: ['./master-brand.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterBrandComponent implements OnInit {

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

  switchCreate = true;
  switchUpdate = true;
  change = true;
  active = false;
  inactive = false;
  enabledUpdated = false;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  constructor(private restService: RestService, private router: Router) {


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

    this.restService.getBrands().then(data => {
      const resp: any = data;
      Swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
    }).catch(error => {
      console.log(error);
    });
   }
   updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
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
  }

  onChangeUpdate(check: any) {
    this.switchUpdate = check;
    this.enabledUpdated = check;

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
  this.currentBrand = brand;
  this.myFormUpdate.get('descriptionUpdate')?.setValue(brand.description);
  if (this.currentBrand.status === '0') {
    this.enabledUpdated = true;
  } else {
    this.enabledUpdated = false;
  }

  document.getElementById( 'uploadBrand')?.click();

}

   sendBrand() {
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
    this.restService.createBrand(this.myForm.get('description')?.value.toUpperCase(), statusTemp).then(data => {
      const resp: any = data;
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta marca ya esta registrada',
          text: 'Esta marca no se puede registrar',
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
    this.restService.updateBrand(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(), statusTemp)
    .then(data => {
      const resp: any = data;
      if (resp.success === false) {
        Swal.fire({
          title: 'Esta marca ya esta actualizada',
          text: 'Esta marca no se puede actualizar',
          icon: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateBrandHide')?.click();
     this.loadingData();
     Swal.fire({
      title: 'Marca actualizada',
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
          Swal.showLoading();
          this.restService.deleteBrand(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;

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
        } else {
          Swal.fire('Fail');
        }
    });



  }

  ngOnInit() {
  }

  blockAgents( vadr: any) {
  }

}
