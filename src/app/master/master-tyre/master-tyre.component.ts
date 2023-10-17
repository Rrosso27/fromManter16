import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-master-tyre',
  templateUrl: './master-tyre.component.html',
  styleUrls: ['./master-tyre.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterTyreComponent implements OnInit {
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
  enabledUpdated = true;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;

  constructor(private restService: RestService, private router: Router) {
 /*  swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.restService.getBrands().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
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
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.restService.getTyres().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      this.rowStatic =  resp.data;
      this.rowsTemp = resp.data;
      console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }
   updateFilter(event) {
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
    const temp = this.rowsTemp.filter(function(d) {
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

    const temp = this.rowsTemp.filter(function(d) {
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

  onChangeActive(d) {
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


  onChangeInactive(d) {
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

updateBrand(brand) {
  console.log(brand);
  this.currentBrand = brand;
  console.log( this.currentBrand );
  this.myFormUpdate.get('descriptionUpdate').setValue(brand.description);
  if (this.currentBrand.status === '0') {
    this.enabledUpdated = true;
  } else {
    this.enabledUpdated = false;
  }

  document.getElementById( 'uploadBrand').click();

}

   sendBrand() {
    console.log(localStorage.getItem('token'));
    this.submitted = true;
   if ( !this.myForm.invalid) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    let statusTemp = 0;
    if (this.enabledUpdated === true) {
      statusTemp = 0;
    } else {
      statusTemp = 1;
    }
    this.restService.createTyre(this.myForm.get('description').value.toUpperCase(), statusTemp).then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        swal({
          title: 'Esta tipo de llanta ya esta registrada',
          text: 'Esta tipo de llanta no se puede registrar',
          type: 'error'
         });
      } else {
        this.myForm.get('description').setValue('');
     /*swal({
      title: 'tipo de llanta agregada',
      type: 'success'
     });*/
   //   this.router.navigateByUrl('master/registerBrand');

   document.getElementById( 'createBrandHide').click();
   this.loadingData();
   swal({
    title: 'tipo de llanta agregada',
    type: 'success'
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
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    let statusTemp = 1;
    if (this.enabledUpdated === true) {
      statusTemp = 0;
    } else {
      statusTemp = 1;
    }
    console.log(this.myFormUpdate.get('descriptionUpdate').value.toUpperCase() + ' ' + statusTemp);
    this.restService.updateTyre(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate').value.toUpperCase(), statusTemp)
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        swal({
          title: 'Esta tipo de llanta ya esta actualizada',
          text: 'Esta tipo de llanta no se puede actualizar',
          type: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateBrandHide').click();
     this.loadingData();
     swal({
      title: 'tipo de llanta actualizada',
      type: 'success'
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
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
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
          swal.showLoading();
          this.restService.deleteTyre(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Esta tipo de llanta presenta problemas',
                text: 'Esta tipo de llanta no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.loadingData();
           swal({
            title: 'tipo de llanta eliminada',
            type: 'success'
           });
          }
          }).catch(error => {
            console.log(error);
          });
          console.log(this.elementDelete.id);
        } else {
         // swal('Fail');
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
