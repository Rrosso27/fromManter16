import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import { EstimateService } from '../../master-services/estimate/estimate.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { Router } from '@angular/router';


@Component({
  selector: 'app-master-estimate-countries',
  templateUrl: './master-estimate-countries.component.html',
  styleUrls: ['./master-estimate-countries.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterEstimateCountriesComponent implements OnInit {

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submitted = false;
  submittedUpdate = false;
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

  currentCountry: any;

  constructor(private restService: RestService, private router: Router, private estimateService: EstimateService) {

    this.loadingData();

    const name = new FormControl('', Validators.required);
    const money = new FormControl('', Validators.required);

    const nameUpdate = new FormControl('', Validators.required);
    const moneyUpdate = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      name: name,
      money:money
    });

    this.myFormUpdate = new FormGroup({
      nameUpdate: nameUpdate,
      moneyUpdate:moneyUpdate
    });
   }


   loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.estimateService.getEstimateCountries().then(data => {
      const resp: any = data;

      this.rowsClient = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
   }

   sendCountry() {
    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();


    this.estimateService.createEstimateCountries(this.myForm.get('name')?.value.toUpperCase(),
     this.myForm.get('money')?.value.toUpperCase()).then(data => {
      const resp: any = data;
      if (resp.success === false) {
        Swal.fire({
          title: 'Este país ya esta registrado',
          text: 'Este país no se puede registrar',
          icon: 'error'
         });
      } else {
        this.myForm.get('name')?.setValue('');
        this.myForm.get('money')?.setValue('');
     /*Swal({
      title: 'Marca agregada',
      type: 'success'
     });*/
   //   this.router.navigateByUrl('master/registerBrand');

   document.getElementById( 'createCountryHide')?.click();
   this.loadingData();
   Swal.fire({
    title: 'País agregado',
    icon: 'success'
   });
    }
    }).catch(error => {
      console.log(error);
    });
    }
  }

  sendUpdateCountry() {
    this.submittedUpdate = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.estimateService.updateEstimateCountries(Number(this.currentCountry.id), this.myFormUpdate.get('nameUpdate')?.value.toUpperCase(),
                                               this.myFormUpdate.get('moneyUpdate')?.value.toUpperCase())
    .then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title: 'Esta país ya esta registrado',
          text: 'Este país no se puede actualizar',
          icon: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateCountryHide')?.click();
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



  updateCountry(estimateCountry:any) {
    this.currentCountry = estimateCountry;
    this.myFormUpdate.get('nameUpdate')?.setValue(estimateCountry.name);
    this.myFormUpdate.get('moneyUpdate')?.setValue(estimateCountry.money);
    document.getElementById( 'uploadCountry')?.click();
  }
  deleteCountry(country: any) {
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
          this.elementDelete = country;
            Swal.showLoading();
          this.estimateService.deleteEstimateCountries(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            if (resp.success === false) {
              Swal.fire({
                title: 'Este país presenta problemas',
                text: 'Este país no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.loadingData();
           Swal.fire({
            title: 'País eliminada',
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

  ngOnInit() {
  }

  blockAgents( vadr: any) {
  }

}
