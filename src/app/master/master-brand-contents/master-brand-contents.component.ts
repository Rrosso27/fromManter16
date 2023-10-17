import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { BrandService } from '../../master-services/brand/brand.service';

@Component({
  selector: 'app-master-brand-contents',
  templateUrl: './master-brand-contents.component.html',
  styleUrls: ['./master-brand-contents.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterBrandContentsComponent implements OnInit {

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  rowsClient: any;
  rowsTemp: any;
  rowStatic: any;

  elementDelete: any;



  rowsTempCheck: any;
  rowsTempText: any;

  currentBrand: any;
  submitted = false;

  active = false;
  inactive = false;
  enabledUpdated = false;

  filterIndicatorText = false;
  filterIndicatorCheck = false;

  constructor(private router: Router, private brand:BrandService) {
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

    this.brand.getBrandAll().then(data => {
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
          this.brand.deleteBrand(Number(this.elementDelete.id))
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
         // Swal('Fail');
        }
    });
  }

  updateBrand(brand:any) {
    this.currentBrand = brand;

    this.myFormUpdate.get('descriptionUpdate')?.setValue(brand.description);
    document.getElementById( 'uploadBrand')?.click();

  }


  sendUpdateBrand() {
    this.submitted = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.brand.updateBrand(Number(this.currentBrand.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase())
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
      Swal.fire({
        title: 'Ha ocurrido un error',
        text: 'Ha ocurrido un error al actualizar la marca.',
        icon: 'error'
       });
    });
    }
  }

  sendBrand() {
    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.brand.storeBrand(this.myForm.get('description')?.value.toUpperCase()).then(data => {
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
      Swal.fire({
        title: 'Ha ocurrido un error',
        text: 'Ha ocurrido un error al guardar la marca.',
        icon: 'error'
       });
    });
    }
  }



  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }



  ngOnInit() {
  }

}
