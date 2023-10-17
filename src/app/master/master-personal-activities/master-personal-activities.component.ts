import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PersonalService } from '../../master-services/personal/personal.service';

@Component({
  selector: 'app-master-personal-activities',
  templateUrl: './master-personal-activities.component.html',
  styleUrls: ['./master-personal-activities.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterPersonalActivitiesComponent implements OnInit {
  active = false;
  inactive = false;
  filterIndicatorText = false;
  rowsTemp: any;
  rowStatic: any;
  change = true;

  rowsClient: any;
  myForm: FormGroup;
  submitted:any = false;
  enabledCreated:any= true;
  switchUpdate:any = true;
  showButtonUpdated = 0;
  enabledUpdated: any;

  myFormUpdate: FormGroup;
  submittedUpdated:boolean = false;
  enabledCreatedOfficeUpdate:boolean = false;

  currentActivities: any;
  codeUpdate: any;
  descriptionUpdate:String = '';

  code: any;
  description:String = '';
  idActivitiesCreate:any;

  elementDelete: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;


  constructor(private personalService: PersonalService, private router: Router) {
   this.loadingData();

   const code = new FormControl('', Validators.required);
   const description = new FormControl('', Validators.required);


   const codeUpdate = new FormControl('', Validators.required);
   const descriptionUpdate  = new FormControl('', Validators.required);

   this.myForm = new FormGroup({
     code: code,
     description: description,
   });

   this.myFormUpdate = new FormGroup({
    codeUpdate: codeUpdate,
    descriptionUpdate: descriptionUpdate,
  });
   }


   sendActiviti() {
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

      this.personalService.createActiviti(this.myForm.get('description')?.value.toUpperCase(),
       this.myForm.get('code')?.value)
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
          this.idActivitiesCreate = resp.data.id;
          console.log('Cambio');
          this.myForm.reset();
          document.getElementById('createRegionalHide')?.click();
          this.loadingData();
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


  updateAct(row:any) {
    console.log(row);
    this.currentActivities = row;
    console.log( this.currentActivities );
    this.myFormUpdate.get('descriptionUpdate')?.setValue(row.description);
    this.myFormUpdate.get('codeUpdate')?.setValue(row.code);
      this.enabledUpdated = true;

    document.getElementById( 'updateReg')?.click();
   }

  updatedActiviti() {
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

      this.personalService.updateActiviti(Number(this.currentActivities.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase(),
       this.myFormUpdate.get('codeUpdate')?.value)
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


  deleteAct(brand: any) {
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
          this.personalService.deleteActiviti(Number(this.elementDelete.id))
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

    this.personalService.getActiviti().then(data => {
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
