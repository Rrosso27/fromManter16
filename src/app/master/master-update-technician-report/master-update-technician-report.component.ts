import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { PersonalService } from '../../master-services/personal/personal.service';

@Component({
  selector: 'app-master-update-technician-report',
  templateUrl: './master-update-technician-report.component.html',
  styleUrls: ['./master-update-technician-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})

export class MasterUpdateTechnicianReportComponent implements OnInit {

 
  routineDescriptionUpdate:string;
  routineHourUpdate:number;
  routineObservationUpdate:string;

 
  partForm: FormGroup;
  updatePartForm: FormGroup;

  
  showButtonUpdated:boolean;
  headerInfo:any;
  submitted = false;
  rowsWorkDetails: any;
  elementDelete:any;
  currentDetail:any;
  currentPart: any;

  headerId:any;

  constructor(  private router: Router,  private activatedRoute: ActivatedRoute, 
    private formBuilder:FormBuilder, private personalServices:PersonalService) {

    this.headerId = this.activatedRoute.snapshot.params.id;
    this.getReport(this.headerId);

    const partDescription = new FormControl('',Validators.required);

    this.partForm= new FormGroup({
      partDescription:partDescription,

    });

    const partDescriptionUpdate = new FormControl('',Validators.required);

    this.updatePartForm= new FormGroup({
      partDescriptionUpdate:partDescriptionUpdate,

    });
   }

   
  getReport(id: number) {
    this.personalServices.getReportTechnicianById(id).then(data => {
      const resp: any = data;
      console.log(data);
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
        } else {
          console.log( resp.data);
      //  this.title2 = resp.data.description;
      //  this.hours2 = resp.data.hours;
      //  this.observation2 = resp.data.observation;

        this.routineHourUpdate= resp.data.hours;
        this.routineDescriptionUpdate= resp.data.description;
        this.routineObservationUpdate= resp.data.observation;
        this.getReportDetails();
    }
    }).catch(error => {
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }

  
  getReportDetails(){
    this.personalServices.getReportTechnicianDetail(this.headerId).then(data=>{
      const resp:any=data;
      if (resp.success==true) {
        console.log('buena info');
        // let ole:any= JSON.parse(resp.data);
        this.rowsWorkDetails = resp.data;
         console.log(this.rowsWorkDetails)

      }
    }).catch(error=>{
      console.log(error);
      this.generalAlert("ha ocurrido un error","ha ocurrido un error al mostrar la informacion","error");
    });
  }

  
 
  deletePart(item: any) {
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
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          swal.showLoading();
          this.personalServices.deleteReportTechnicianDetail(Number(this.elementDelete.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Este item presenta problemas',
                text: 'Este item no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.getReportDetails();
           swal({
            title: 'Elemento eliminado',
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

  
  updateParts(row: any){
    
    this.currentPart = row;
    console.log( this.currentPart );
    this.updatePartForm.get('partDescriptionUpdate').setValue(this.currentPart.description);

   document.getElementById( 'showUpdatePart').click();
  }

  sendUpdatePart(updatePartForm: any){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    console.log(this.currentPart.id);
    console.log(this.currentPart);
    console.log(updatePartForm);
    console.log(updatePartForm.partDescriptionUpdate);
   
    const description=updatePartForm.partDescriptionUpdate;
    if((description!=null)&&(description!="")){
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.personalServices.updateReportTechnicianDetail(this.currentPart.id,description).then(data=>{
        this.getReportDetails();
        this.generalAlert("Proceso completado","Proceso completado correctamente!","success");
        document.getElementById( 'updatePartHide').click();
      }).catch(err=>{
        console.log(err);
        this.generalAlert("Ha ocurrido un herror","Ocurrio un error durante la ejecución","error");
      });
    }else{
      this.generalAlert("Ha ocurrido un herror","Complete todos los campos obligatorios","error");
    }
  }

  
  updateheader(){
    console.log(this.routineDescriptionUpdate);
    if ((this.routineDescriptionUpdate!=null) || (this.routineDescriptionUpdate!="") || (this.routineHourUpdate==null)) {
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.personalServices.updateReportTechnician(this.headerId,this.routineDescriptionUpdate,this.routineHourUpdate,this.routineObservationUpdate).then(data=>{
        const resp:any=data;
        if(resp.success){
        this.headerInfo=resp.data;
        this.headerId= this.headerInfo.id;
        console.log("header information");
        console.log(this.headerInfo);
        this.generalAlert("Proceso completado","Proceso completado correctamente!","success");
        this.routineHourUpdate=this.headerInfo.hours;
        this.routineDescriptionUpdate=this.headerInfo.description;
        this.routineObservationUpdate=this.headerInfo.observation;
          this.getReportDetails();
        }else{
          this.generalAlert("Ha ocurrido un herror","Ya existe un reporte con este nombre","error");
        }
      }).catch(err=>{
        console.log(err);
        this.generalAlert("Ha ocurrido un herror","Ocurrio un error durante la ejecucion","error");
      });
    }else{
      this.generalAlert("Ha ocurrido un herror","Complete todos los campos obligatorios","error");
    }
  }

  
  storagePart(formValue:any){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    
    console.log(formValue.value);
    console.log(formValue.value.partDescription);

    const description=formValue.value.partDescription;
  
  
    if((description!=null)&&(description!="")){
    this.personalServices.createReportTechnicianDetail(this.headerId,description).then(data=>{
      const resp:any=data;
      console.log(data);
      console.log(resp);
      if (resp.success==1) {
        this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
        this.partForm.reset();
        document.getElementById('storagePartHide').click();
        //this.getPart(this.componentForPart);
        this.getReportDetails();
        swal.close();
      } else {
        this.generalAlert('No se puede guardar','Ha ocurrido un error en la ejecucion','error');
      }
      }).catch(error=>{
        console.log(error);
        this.generalAlert('No se puede guardar','Ha ocurrido un error en la ejecucion','error')
      });
    }else{
      this.generalAlert('No se puede guardar','Debe Completar todos los campos obligatorios','error')
    }
  }


  generalAlert(title:string,message:string,type:any){
    swal({
      title:title,
      text: message,
      type: type
     });
  }

  goAdminChecklist(){
    this.router.navigateByUrl('maintenance/technicianReport');
  }



  ngOnInit() {
  }

}
