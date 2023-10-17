import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SystemsService } from '../../master-services/systems/systems.service';

@Component({
  selector: 'app-master-maintenance-system',
  templateUrl: './master-maintenance-system.component.html',
  styleUrls: ['./master-maintenance-system.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterMaintenanceSystemComponent implements OnInit {

  myForm: FormGroup;
  myFormUpdate: FormGroup;

  rowsWork: any;
  rowtodelete:any;
  description:any;
  currentSystem:any;

  submitted:any = false;
  submittedUpdated:any = false;

  constructor(private router:Router,private systemService:SystemsService) {

    const description = new FormControl('', Validators.required);

    const descriptionUpdate  = new FormControl('', Validators.required);


    this.myForm = new FormGroup({
      description: description,
    });

    this.myFormUpdate = new FormGroup({
     descriptionUpdate: descriptionUpdate,
   });


    this.getWorks();
  }

  getWorks() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    this.systemService.getSystem().then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        console.log(data);
        this.rowsWork = resp.data;
        console.log( this.rowsWork);
        Swal.close();
    }
    }).catch(error => {
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });
  }

  sendSystem() {
    console.log('Ole ole ole');
    console.log(this.description);

     if ( !this.myForm.invalid) {
      this.submitted = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

      this.systemService.storeSystem(this.myForm.get('description')?.value).then(data => {
        const resp: any = data;
        console.log(resp);
        if (resp.success === false) {
          if(resp.status == 1){
            Swal.fire({
              title: 'Este sistema ya esta registrado',
              text: 'Este sistema no se pudo registrar',
              icon: 'error'
             });
          }
          if(resp.status == 2){
            Swal.fire({
              title: 'Ha ocurrido un error',
              text: 'Este sistema no se pudo registrar',
              icon: 'error'
             });
          }
        } else {
          console.log('Cambio');
          document.getElementById('createRegionalHide')?.click();
          this.getWorks();
          this.myForm.reset();
          Swal.fire({
            title: 'Sistema agregado',
            icon: 'success'
          });
        }
      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: 'Este sistema no se pudo registrar',
          icon: 'error'
         });
      });

    } else {
      Swal.fire({
        title: 'Debe llenar todos los campos obligatorios',
        text: 'Debe llenar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }


  updateSys(row:any) {
    console.log(row);
    this.currentSystem = row;
    this.myFormUpdate.get('descriptionUpdate')?.setValue(row.description);
    document.getElementById( 'updateReg')?.click();
   }

  updatedRegional() {

    if ( !this.myFormUpdate.invalid) {
      this.submittedUpdated = true;
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();


      this.systemService.updateSystem(Number(this.currentSystem.id), this.myFormUpdate.get('descriptionUpdate')?.value.toUpperCase())
      .then(data => {
        const resp: any = data;
        console.log(JSON.stringify(resp));
        if (resp.success === false) {
          if(resp.status == 1){
            Swal.fire({
              title: 'Este sistema ya esta registrado',
              text: 'Este sistema no se pudo actualizar',
              icon: 'error'
             });
          }
          if(resp.status == 2){
            Swal.fire({
              title: 'Falla en la actualizacion',
              text: 'Este sistema no se pudo actualizar',
              icon: 'error'
             });
          }
        } else {
          console.log('Cambio');
          document.getElementById('updateBrandHide')?.click();
          this.getWorks();
     Swal.fire({
      title: 'Sistema actualizado.',
      icon: 'success'
     });
      }
      }).catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: 'Este sistema no se pudo actualizar',
          icon: 'error'
         });
      });

    } else {
      Swal.fire({
        title: 'Debe llenar todos los campos obligatorios',
        text: 'Debe llenar todos los campos obligatorios',
        icon: 'error'
       });
    }
  }

  deleteWorkHeader(workrow:any){
    Swal.fire({
      title:"Confirmación",
      text:"Esta seguro que desea borrar este elemento?",
      cancelButtonText:"No",
      confirmButtonText:"Si",
      showCancelButton:true,
      showConfirmButton:true
    }).then(goingtodelete=>{
      if (goingtodelete.value) {
        this.loader();
        this.rowtodelete=workrow;
        console.log(this.rowtodelete);
        this.systemService.deleteSystem(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','Ocurrio un error durante el procesado',"error");
          }else{
              this.generalAlert('Sistema eliminado','Sistema eliminado correctamente','success');
              this.getWorks();
          }
        }).catch(err=>{
          console.log(err);
          this.generalAlert('Error','Ocurrio un error durante el procesado',"error");
        });
      } else {
        console.log("Proceso cancelado");
      }
    });
  }

  generalAlert(title:string,text:string,type:any){
    Swal.fire({
      title:title,
      text:text,
      icon:type
    })
  }

  loader(){
    Swal.fire({
      title:"Procesando información",
      allowEscapeKey:false,
      allowOutsideClick:false
    });
    Swal.showLoading();
  }

  get checkForm() { return this.myForm.controls; }
  get checkFormUpdate() { return this.myFormUpdate.controls; }

  ngOnInit() {
  }

}
