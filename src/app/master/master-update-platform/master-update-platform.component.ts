import { Component, OnInit } from '@angular/core';
import { PlatformsService } from '../../master-services/platforms/platforms.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-master-update-platform',
  templateUrl: './master-update-platform.component.html',
  styleUrls: ['./master-update-platform.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdatePlatformComponent implements OnInit {

  routineDescriptionUpdate:string;
  routineHourUpdate:number;
  routineObservationUpdate:string;

  partForm: FormGroup;
  updatePartForm: FormGroup;

  showButtonUpdated:boolean;
  headerInfo:any;
  submitted = false;

  elementDelete:any;

  descriptionSystem: string;

  headerId:any;
  
  system: any;
  currentSystem:any;

  supplicePart:any = 0;
  deliveryReview:any = 0;
  pending:any = 0;
  survey:any = 0;
  firm:any = 0;

  platformsId:any;
  platforms:any;

  constructor(private platformsService:PlatformsService, private router: Router,  private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder) {

      this.platformsId = this.activatedRoute.snapshot.params.id;

    this.getPlatformSpecific(this.platformsId);

      const systemDescription = new FormControl('',Validators.required);

     
      this.partForm= new FormGroup({
        systemDescription:systemDescription,

      });
  
      const systemDescriptionUpdate = new FormControl('',Validators.required);

      this.updatePartForm= new FormGroup({
        systemDescriptionUpdate:systemDescriptionUpdate,

      });
   
     }

     getPlatformSpecific(id: number){
      this.platformsService.getPlatformsId(id).then(data => {
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
          this.platforms = resp.data;
          this.routineHourUpdate= resp.data.hours;
          this.routineDescriptionUpdate= resp.data.description;
          this.routineObservationUpdate= resp.data.observation;

          if(this.platforms.delivery_review == 1){
            document.getElementById('deliveryReview').click();
          }
          if(this.platforms.supplice_part == 1){
            document.getElementById('supplicePart').click();
          }
          if(this.platforms.survey == 1){
            document.getElementById('survey').click();
          }
          if(this.platforms.pending == 1){
            document.getElementById('pending').click();
          }
          if(this.platforms.firm == 1){
            document.getElementById('firm').click();
          }

       this. getWorkDetails(id);   
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
  
  
  getWorkDetails(id:number){
    this.platformsService.getSystem(id).then(data=>{
      const resp:any=data;
      if (resp.success==true) {
        this.system = resp.data;
        console.log(this.system)

       /* for (let system of this.maintenanceSystem){
          console.log(system.id);
          this.getComponent(system.id);
        }*/
      }/* else {
        this.generalAlert("ha ocurrido un error","ha ocurrido un error al mostrar la informacion","error");
      }*/
    }).catch(error=>{
      console.log(error);
      this.generalAlert("ha ocurrido un error","ha ocurrido un error al mostrar la informacion","error");
    });
  }

  
  updatePart(row: any){
    
    this.currentSystem = row;
    console.log( this.currentSystem );
    this.updatePartForm.get('systemDescriptionUpdate').setValue(this.currentSystem.system_description);

   document.getElementById( 'showUpdatePart').click();
  }

  sendUpdatePart(updatePartForm: any){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    console.log(updatePartForm);
    console.log(updatePartForm.systemDescriptionUpdate);

    const description=updatePartForm.systemDescriptionUpdate;

    if((description!=null)&&(description!="")){
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.platformsService.updateSystem(this.currentSystem.maintenance_system_id,description).then(data=>{
        this.getWorkDetails(this.platformsId);
        this.generalAlert("Proceso completado","Proceso completado correctamente!","success");
        document.getElementById( 'updatePartHide').click();
      }).catch(err=>{
        console.log(err);
        this.generalAlert("ha ocurrido un herror","ocurrio un error durante la ecucion","error");
      });
    }else{
      this.generalAlert("ha ocurrido un herror","complete todos los campos obligatorios","error");
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
      this.platformsService.updatePlatforms(this.platformsId,this.routineDescriptionUpdate,this.routineHourUpdate,this.routineObservationUpdate,this.supplicePart,this.deliveryReview,
        this.pending,this.survey,this.firm).then(data=>{
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
          this.getWorkDetails(this.platformsId);
        }else{
          this.generalAlert("ha ocurrido un herror","Ya existe una rutina con este nombre","error");
        }
      }).catch(err=>{
        console.log(err);
        this.generalAlert("ha ocurrido un herror","ocurrio un error durante la ecucion","error");
      });
    }else{
      this.generalAlert("ha ocurrido un herror","complete todos los campos obligatorios","error");
    }
  }

  
  storagePart(formValue:any){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    
    console.log(formValue.value);
    console.log(formValue.value.systemDescription);


    const description=formValue.value.systemDescription;

  
    if(((description!=null)&&(description!="")) ){
    this.platformsService.storeSystem(this.platformsId,description).then(data=>{
      const resp:any=data;
      console.log(data);
      console.log(resp);
      if (resp.success==1) {
        this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
        this.partForm.reset();
        document.getElementById('storagePartHide').click();
        // this.getPart(this.componentForPart);
        this.getWorkDetails(this.platformsId);
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
          this.platformsService.deleteSystem(Number(this.elementDelete.id))
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
           this.getWorkDetails(this.platformsId);
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

  
  selectStatuSupplicePart(event:any){
    console.log(event);
    console.log(this.supplicePart);
    if(event.target.checked == true){

      this.supplicePart =  1;  
      console.log(this.supplicePart);
    }
    console.log(this.supplicePart);
  }

  selectStatusDeliveryReview(event:any){
    console.log(event);
    console.log(this.deliveryReview);
    if(event.target.checked == true){

      this.deliveryReview =  1;  
      console.log(this.deliveryReview);
    }
    console.log(this.deliveryReview);
  }

  selectStatusPending(event:any){
    console.log(event);
    console.log(this.pending);
    if(event.target.checked == true){

      this.pending =  1;  
      console.log(this.pending);
    }
    console.log(this.pending);
  }

  selectStatuSurvey(event:any){
    console.log(event);
    console.log(this.survey);
    if(event.target.checked == true){

      this.survey =  1;  
      console.log(this.survey);
    }
    console.log(this.survey);
  }

  selectStatusFirm(event:any){
    console.log(event);
    console.log(this.firm);
    if(event.target.checked == true){

      this.firm =  1;  
      console.log(this.firm);
    }
    console.log(this.firm);
  }


  generalAlert(title:string,message:string,type:any){
    swal({
      title:title,
      text: message,
      type: type
     });
  }

  goAdminRoutines(){
    this.router.navigateByUrl('maintenance/platforms');
  }

  ngOnInit() {
  }

}
