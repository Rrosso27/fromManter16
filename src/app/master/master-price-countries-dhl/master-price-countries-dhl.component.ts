import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import { EstimateService } from '../../master-services/estimate/estimate.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-price-countries-dhl',
  templateUrl: './master-price-countries-dhl.component.html',
  styleUrls: ['./master-price-countries-dhl.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterPriceCountriesDhlComponent implements OnInit {

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
  selectedEstimateCountryId :any=0;
  estimateCountries: any;

  currentCountryText:any;

  constructor(private restService: RestService, private router: Router, private estimateService: EstimateService) {
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

    const weight = new FormControl('', Validators.required);
    const price = new FormControl('', Validators.required);


    const weightUpdate = new FormControl('', Validators.required);
    const priceUpdate = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      weight: weight,
      price:price
    });

    this.myFormUpdate = new FormGroup({
      weightUpdate: weightUpdate,
      priceUpdate:priceUpdate
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
      this.estimateCountries = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });


   }

   sendPriceCountries() {
    console.log(localStorage.getItem('token'));
    this.submitted = true;
   if ( !this.myForm.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();


    this.estimateService.createPriceCountries(Number(this.selectedEstimateCountryId.id),
                                              this.myForm.get('weight')?.value.toUpperCase(),
                                      this.myForm.get('price')?.value.toUpperCase()).then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.success === false) {
        Swal.fire({
          title: 'Este peso ya esta registrado',
          text: 'Este peso no se puede registrar',
          icon: 'error'
         });
      } else {
        this.myForm.get('weight')?.setValue('');
        this.myForm.get('price')?.setValue('');
     /*Swal({
      title: 'Marca agregada',
      type: 'success'
     });*/
   //   this.router.navigateByUrl('master/registerBrand');

   document.getElementById( 'createCountryHide')?.click();
   this.ChangingValue();
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

  ChangingValue(){
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log('--------------');
    this.currentCountryText= this.selectedEstimateCountryId.name;
    console.log('-----*******---------');
    console.log( this.currentCountryText);
    console.log(this.selectedEstimateCountryId.id);
    this.estimateService.getPriceDhlCountry(Number(this.selectedEstimateCountryId.id)).then(data => {
      const resp: any = data;
      console.log(data);
      this.rowsClient = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
  }

  sendUpdatePriceCountries() {
    this.submittedUpdate = true;
   if ( !this.myFormUpdate.invalid) {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log('-----------------');
    console.log(Number(this.currentCountry.id)+'-'+ Number(this.myFormUpdate.get('weightUpdate')?.value)+'-'+Number(this.myFormUpdate.get('priceUpdate')?.value));
    console.log('----------------------');
    this.estimateService.updatePriceCountries(Number(this.currentCountry.id),
    Number(this.myFormUpdate.get('weightUpdate')?.value),
    Number(this.myFormUpdate.get('priceUpdate')?.value))
    .then(data => {
      const resp: any = data;
      console.log(resp);
      if (resp.error) {
        Swal.fire({
          title: 'Esta país ya esta registrado',
          text: 'Este país no se puede actualizar',
          icon: 'error'
         });
      } else {
     // this.router.navigateByUrl('master/registerBrand');
     document.getElementById( 'updateCountryHide')?.click();
     this.ChangingValue();
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



  updatePriceCountry(estimatePriceCountry:any) {
    console.log(estimatePriceCountry);
    this.currentCountry = estimatePriceCountry;
    console.log( this.currentCountry );
    this.myFormUpdate.get('weightUpdate')?.setValue(estimatePriceCountry.weight);
    this.myFormUpdate.get('priceUpdate')?.setValue(estimatePriceCountry.price);
    document.getElementById( 'uploadCountry')?.click();
  }
  deletePriceCountry(country: any) {
    Swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    })
    .then((willDelete:any) => {
        if (willDelete.value) {
          this.elementDelete = country;
          console.log(country);
          console.log(    this.elementDelete);
          Swal.showLoading();
          this.estimateService.deletePriceCountries(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Este peso presenta problemas',
                text: 'Este peso no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.ChangingValue();
           Swal.fire({
            title: 'Peso eliminada',
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
