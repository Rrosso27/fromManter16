import { Component, OnInit } from '@angular/core';
import { RestService } from '../../master-services/Rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-master-technicians',
  templateUrl: './master-technicians.component.html',
  styleUrls: ['./master-technicians.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterTechniciansComponent implements OnInit {

  active = false;
  inactive = false;
  filterIndicatorText = false;
  rowsTemp: any;
  rowStatic: any;
  change = true;
  rowsClient: any;
  
  elementDelete: any;
  filterIndicatorCheck = false;

  rowsTempCheck: any;
  rowsTempText: any;

  dataMasters: any;
  typeDocuments: any;

  myForm: FormGroup;
  submitted = false;

  check = false;
  enable = false;
  enabledCreated = true;

  currentTechnicianId: any = 0;
  idtechnicanCreated;

  selectedTypeDocumentId: any = 0;


  myFormUpdate: FormGroup;
  submittedUpdated = false;
  switchUpdate = true;
  enabledCreatedOfficeUpdate:boolean;

  selectedTypeDocumentIdUpdate: any = 0;
  idTechnician;
  technician: any;

  currentTechnician = 0;
  enabledUpdated;

  constructor(private restService: RestService, private router: Router,
    private rutaActiva: ActivatedRoute,) {
    this.loadingData();

    const name = new FormControl('', Validators.required);
    const document = new FormControl('', Validators.required);
    const cellphone = new FormControl('');

    const nameUpdate = new FormControl('', Validators.required);
    const documentUpdate  = new FormControl('', Validators.required);
    const cellphoneUpdate  = new FormControl('', Validators.required);

    this.myForm = new FormGroup({
      name: name,
      document: document,
      cellphone: cellphone,
    });

    this.myFormUpdate = new FormGroup({
      nameUpdate: nameUpdate,
      documentUpdate: documentUpdate,
      cellphoneUpdate: cellphoneUpdate,
   });
  }

updateTech(row) {
  console.log(row);
  this.currentTechnician = row;
  console.log(this.currentTechnician);
  this.myFormUpdate.get('documentUpdate').setValue(row.document);
  this.myFormUpdate.get('nameUpdate').setValue(row.name);
  this.myFormUpdate.get('cellphoneUpdate').setValue(row.cellphone);
  this.idTechnician= row.id;
  console.log(this.idTechnician);
    this.enabledUpdated = true;
  
  document.getElementById('updateTech').click();
 }

updatedTechnician() {
  console.log('Ole ole ole kakaakkaka');

  if ( !this.myFormUpdate.invalid) {
    this.submittedUpdated = true;
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    let statusTemp = 1;
    console.log( this.switchUpdate);
    if ( this.enabledCreatedOfficeUpdate) {
      statusTemp = 0;
    }
    console.log('kakakaka');

    this.restService.updateTechnian(Number(this.idTechnician), this.myFormUpdate.get('nameUpdate').value.toUpperCase(),
    this.myFormUpdate.get('documentUpdate').value, this.myFormUpdate.get('cellphoneUpdate').value)
    .then(data => {
      const resp: any = data;
      console.log(JSON.stringify(resp));
      if (resp.success === false) {
        swal({
          title: 'Falla en la actualización',
          text: 'Este tecnico no se pudo actualizar',
          type: 'error'
         });
      } else {
        console.log('Cambio');
        document.getElementById('updatTechnicianHide').click();
        this.loadingData();    
   swal({
    title: 'Tecnico actualizado',
    type: 'success'
   });
    }
    }).catch(error => {
      console.log(error);
    });
  } else {
    swal({
      title: 'Debe seleccionar todos los campos obligatorios',
      text: 'Debe seleccionar todos los campos obligatorios',
      type: 'error'
     });
  }
}

sendTechnicians() {
  console.log('Ole ole ole');

    this.submitted = true;
   if ( !this.myForm.invalid) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    let statusTemp = 0;
    if ( this.enabledCreated === false) {
      statusTemp = 1;
    }
    this.restService.createTechnicians(this.myForm.get('name').value.toUpperCase(),
    this.myForm.get('document').value, this.myForm.get('cellphone').value)
    .then(data => {
      const resp: any = data;
      console.log(resp);
      console.log('id technian' + resp.data.id);
      this.currentTechnicianId =  resp.data.id;
      if (resp.success === false) {
        swal({
          title: 'Este tecnico ya esta registrado',
          text: 'Este tecnico no se puede registrar',
          type: 'error'
         });
      } else {
        this.idtechnicanCreated = resp.data.id;
        console.log('creo');
        document.getElementById( 'createTechnicianHide').click();
        this.loadingData();
   swal({
    title: 'Tecnico agregado',
    type: 'success'
   });
    }
    }).catch(error => {
      console.log(error);
    });
    
  } else {
    swal({
      title: 'Debe seleccionar todos los campos obligatorios',
      text: 'Debe seleccionar todos los campos obligatorios',
      type: 'error'
     });
  }
}

  deleteTechnicians(brand: any) {
    swal({
      title: 'Estás seguro de eliminar este elemento?',
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
          this.restService.deleteTechnician(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este cliente presenta problemas',
                text: 'Este tecnico no se puede eliminar',
                type: 'error'
               });
            } else {

           this.loadingData();
           swal({
            title: 'Tecnico eliminado',
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

  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.restService.getTechnicians().then(data => {
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
      return d.business_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (val !== '') {
      this.filterIndicatorText = true;
      this.rowsTempText = temp;
    }

    // update the rows
    this.rowsClient = temp;

  }

  ngOnInit() {
  }
  get checkFormUpdate() { return this.myFormUpdate.controls; }
  get checkForm() { return this.myForm.controls; }
}
