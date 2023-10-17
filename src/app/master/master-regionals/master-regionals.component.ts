import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RestService } from '../../master-services/Rest/rest.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-master-regionals',
  templateUrl: './master-regionals.component.html',
  styleUrls: ['./master-regionals.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterRegionalsComponent implements OnInit {

  active = false;
  inactive = false;
  filterIndicatorText = false;
  rowsTemp: any;
  rowStatic: any;
  change = true;

  rowsClient: any;
  submitted = false;
  enabledCreated= true;
  switchUpdate = true;
  showButtonUpdated = 0;
  enabledUpdated: any;

  myForm: FormGroup;
  myFormUpdate: FormGroup;
  submittedUpdated = false;
  enabledCreatedOfficeUpdate:boolean=true;

  currentRegional: any;
  codeUpdate: any;
  descriptionUpdate = '';
  idRegional:any;
  regional: any;

  code: any;
  description= '';
  idRegionalCreate:any;

  elementDelete: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;


  constructor(private restService: RestService, private router: Router) {
   this.loadingData();

   const code = new FormControl('', Validators.required);
   const description = new FormControl('', Validators.required);
   const name = new FormControl('', Validators.required);
   const email = new FormControl('', Validators.required);

   const codeUpdate = new FormControl('', Validators.required);
   const descriptionUpdate  = new FormControl('', Validators.required);
   const nameUpdate  = new FormControl('', Validators.required);
   const emailUpdate  = new FormControl('', Validators.required);

   this.myForm = new FormGroup({
     code: code,
     description: description,
     name: name,
     email: email,

   });

   this.myFormUpdate = new FormGroup({
    codeUpdate: codeUpdate,
    descriptionUpdate: descriptionUpdate,
    nameUpdate: nameUpdate,
    emailUpdate: emailUpdate
  });
   }

   updateReg(row:any) {
    console.log(row);
    this.currentRegional = row;
    console.log( this.currentRegional );
    this.myFormUpdate.get('descriptionUpdate')?.setValue(row.description);
    this.myFormUpdate.get('codeUpdate')?.setValue(row.code);
    this.myFormUpdate.get('nameUpdate')?.setValue(row.name);
    this.myFormUpdate.get('emailUpdate')?.setValue(row.email);
      this.enabledUpdated = true;

    document.getElementById( 'updateReg')?.click();
   }

   sendRegional() {
    console.log('Ole ole ole');
    console.log(this.code);
    console.log(this.description);

     if ( !this.myForm.invalid) {
      this.submitted = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      let statusTemp = 0;
      console.log( this.switchUpdate);
      if ( this.enabledCreated === false) {
        statusTemp = 1;
      }

      this.restService.createRegional(this.myForm.get('description')?.value.toUpperCase(),
       this.myForm.get('code')?.value,this.myForm.get('name')?.value.toUpperCase(),this.myForm.get('email')?.value)
      .then(data => {
        const resp: any = data;
        console.log(resp);
        if (resp.success === false) {
          Swal.fire({
            title: 'Esta sucursal ya esta registrada',
            text: 'Esta sucursal no se pudo registrar',
            icon: 'error'
           });
        } else {
          this.idRegionalCreate = resp.data.id;
          console.log('Cambio');
          document.getElementById('createRegionalHide')?.click();
          this.loadingData();
          this.myForm.reset();
     Swal.fire({
      title: 'Sucursal agregada',
      icon: 'success'
     });

      }
      }).catch(error => {
        console.log(error);
      });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }

  updatedRegional() {
    console.log('Ole ole ole kakaakkaka');
    console.log(this.codeUpdate);
    console.log(this.descriptionUpdate);

    if ( !this.myFormUpdate.invalid) {
      this.submittedUpdated = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      let statusTemp = 1;
      console.log( this.switchUpdate);
      if ( this.enabledCreatedOfficeUpdate) {
        statusTemp = 0;
      }
      console.log('kakakaka');

      this.restService.updateRegional(Number(this.currentRegional.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(),
       this.myFormUpdate.get('codeUpdate')?.value, this.myFormUpdate.get('nameUpdate')?.value.toUpperCase(), this.myFormUpdate.get('emailUpdate')?.value)
      .then(data => {
        const resp: any = data;
        console.log(JSON.stringify(resp));
        if (resp.success === false) {
          Swal.fire({
            title: 'Falla en la actualizacion',
            text: 'Esta sucursal no se pudo actualizar',
            icon: 'error'
           });
        } else {
          console.log('Cambio');
          document.getElementById('updateBrandHide')?.click();
          this.loadingData();
     Swal.fire({
      title: 'Sucursal actualizada.',
      icon: 'success'
     });
      }
      }).catch(error => {
        console.log(error);
      });

    } else {
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }


  deleteRegional(brand: any) {
    Swal.fire({
      title: 'Estás seguro de eliminar este elemento?',
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
          this.restService.deleteRegional(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Esta sucursal presenta problemas',
                text: 'Esta sucursal no se puede eliminar',
                icon: 'error'
               });
            } else {
           this.loadingData();
           Swal.fire({
            title: 'Reigonal eliminado',
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

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();
    // filter our data

    if (val === '') {
      console.log('vacio');
      this.filterIndicatorText = false;
      this.rowsTemp = this.rowStatic;
    }


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
    this.rowsClient = temp;

  }

  loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.restService.getRegional().then(data => {
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


  ngOnInit() {
  }

  blockAgents( vadr: any) {
    console.log(vadr);
   }


  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
}
