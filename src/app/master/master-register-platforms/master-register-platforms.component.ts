import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlatformsService } from '../../master-services/platforms/platforms.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-master-register-platforms',
  templateUrl: './master-register-platforms.component.html',
  styleUrls: ['./master-register-platforms.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterRegisterPlatformsComponent implements OnInit {
  @Input()
  routineDescription:string = '';
  routineHour:number = 0;
  routineObservation:string = '';
  routineDescriptionUpdate:string = '';
  routineHourUpdate:number = 0;
  routineObservationUpdate:string = '';

  partForm: FormGroup;
  updatePartForm: FormGroup;

  showButtonUpdated:boolean = true;
  headerInfo:any;
  submitted = false;

  elementDelete:any;

  descriptionSystem: string = '';

  headerId:any;

  system: any;
  currentSystem:any;

  supplicePart:any = 0;
  deliveryReview:any = 0;
  pending:any = 0;
  survey:any = 0;
  firm:any = 0;

  constructor(private platformsService:PlatformsService, private router: Router,  private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder) {

      const systemDescription = new FormControl('',Validators.required);


      this.partForm= new FormGroup({
        systemDescription:systemDescription,

      });

      const systemDescriptionUpdate = new FormControl('',Validators.required);

      this.updatePartForm= new FormGroup({
        systemDescriptionUpdate:systemDescriptionUpdate,

      });

     }


  registerheader(){
    console.log(this.routineDescription);
    if ((this.routineDescription!=null) || (this.routineDescription!="") || (this.routineHour==null)) {
      Swal.fire({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      console.log(1+','+this.routineDescription+','+this.routineHour+','+this.routineObservation);
      this.platformsService.storePlatforms(this.routineDescription,this.routineHour,this.routineObservation,this.supplicePart,this.deliveryReview,
        this.pending,this.survey,this.firm).then(data=>{
        const resp:any=data;

        if(resp.success){
          this.headerInfo=resp.data;
          console.log("header information");
          console.log(this.headerInfo)
          Swal.close();

          this.headerId=this.headerInfo.id;
          this.showButtonUpdated=true;
          this.routineHourUpdate=this.headerInfo.hours;
          this.routineDescriptionUpdate=this.headerInfo.description;
          this.routineObservationUpdate=this.headerInfo.observation;
          this.router.navigateByUrl('maintenance/plataformsUpdate/'+this.headerId)
        }else{
          this.generalAlert("ha ocurrido un error","Ya existe una mantenimiento de plataforma con este nombre","error");
        }
      }).catch(err=>{
        this.showButtonUpdated=false;
        console.log(err);
        this.generalAlert("Ha ocurrido un error","Ocurrio un error durante la ecucion","error");
      });
    }else{
      console.log('description '+this.routineDescription);
      this.showButtonUpdated=false;
      this.generalAlert("Ha ocurrido un error","Complete todos los campos obligatorios","error");
    }
  }


  getWorkDetails(){
    this.platformsService.getSystem(this.headerId).then(data=>{
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
    this.updatePartForm.get('systemDescriptionUpdate')?.setValue(this.currentSystem.description);

   document.getElementById( 'showUpdatePart')?.click();
  }

  sendUpdatePart(updatePartForm: any){
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    console.log(updatePartForm);
    console.log(updatePartForm.systemDescriptionUpdate);

    const description=updatePartForm.systemDescriptionUpdate;

    if((description!=null)&&(description!="")){
      Swal.fire({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      this.platformsService.updateSystem(this.currentSystem.id,description).then(data=>{
        this.getWorkDetails();
        this.generalAlert("Proceso completado","Proceso completado correctamente!","success");
        document.getElementById( 'updatePartHide')?.click();
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
      Swal.fire({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      this.platformsService.updatePlatforms(this.headerId,this.routineDescriptionUpdate,this.routineHourUpdate,this.routineObservationUpdate,this.supplicePart,this.deliveryReview,
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
          this.getWorkDetails();
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
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    console.log(formValue.value);
    console.log(formValue.value.systemDescription);


    const description=formValue.value.systemDescription;


    if(((description!=null)&&(description!="")) ){
    this.platformsService.storeSystem(this.headerId,description).then(data=>{
      const resp:any=data;
      console.log(data);
      console.log(resp);
      if (resp.success==1) {
        this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
        this.partForm.reset();
        document.getElementById('storagePartHide')?.click();
        // this.getPart(this.componentForPart);
        this.getWorkDetails();
        Swal.close();
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
          this.elementDelete = item;
          console.log(item);
          console.log(    this.elementDelete);
          Swal.showLoading();
          this.platformsService.deleteSystem(Number(this.elementDelete.id))
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Este item presenta problemas',
                text: 'Este item no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           this.getWorkDetails();
           Swal.fire({
            title: 'Elemento eliminado',
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
    Swal.fire({
      title:title,
      text: message,
      icon: type
     });
  }

  goAdminRoutines(){
    this.router.navigateByUrl('maintenance/platforms');
  }

  ngOnInit() {
  }

}
