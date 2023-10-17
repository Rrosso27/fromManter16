import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { StevedoreService } from '../../master-services/stevedore/stevedore.service';

@Component({
  selector: 'app-master-update-stevedore',
  templateUrl: './master-update-stevedore.component.html',
  styleUrls: ['./master-update-stevedore.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdateStevedoreComponent implements OnInit {

  @Input()
  routineDescription:string = '';
  routineHour:number =0;
  routineObservation:string = '';
  routineDescriptionUpdate:string = '';
  routineHourUpdate:number = 0;
  routineObservationUpdate:string = '';

  componentForm: FormGroup;
  updateComponentForm: FormGroup;
  partForm: FormGroup;
  updatePartForm: FormGroup;

  showButtonUpdated:boolean = true;
  headerInfo:any;
  submitted:boolean = false;

  elementDelete:any;

  descriptionSystem: string = '';

  headerId:any;

  system: any;
  currentSystem:any;
  currentPart:any;

  supplicePart:any = 0;
  deliveryReview:any = 0;
  pending:any = 0;
  survey:any = 0;
  firm:any = 0;

  stevedorId:any;
  componentForPart:any;
  stevedore: any;

  constructor(private stevedorService:StevedoreService, private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,) {

    this.stevedorId = this.activatedRoute.snapshot.paramMap.get('id');

    this.getStevedoSpecific(this.stevedorId);
    //component
    const component = new FormControl('',Validators.required);

    this.componentForm= new FormGroup({
      component:component
    });

    const updateComponent = new FormControl('',Validators.required);
    const routes = new FormControl('',Validators.required);

    this.updateComponentForm= new FormGroup({
      updateComponent: updateComponent
    });

    //part
    const partDescription = new FormControl('',Validators.required);

    this.partForm= new FormGroup({
      partDescription:partDescription,

    });

    const partDescriptionUpdate = new FormControl('',Validators.required);

    this.updatePartForm= new FormGroup({
      partDescriptionUpdate:partDescriptionUpdate,

    });

   }

   getStevedoSpecific(id: number) {
    this.stevedorService.getStevedoreId(id).then(data => {
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
      this.stevedore = resp.data;
        this.routineHourUpdate= resp.data.hours;
        this.routineDescriptionUpdate= resp.data.description;
        this.routineObservationUpdate= resp.data.observation;

        if(this.stevedore.delivery_review == 1){
          document.getElementById('deliveryReview').click();
        }
        if(this.stevedore.supplice_part == 1){
          document.getElementById('supplicePart').click();
        }
        if(this.stevedore.survey == 1){
          document.getElementById('survey').click();
        }
        if(this.stevedore.pending == 1){
          document.getElementById('pending').click();
        }
        if(this.stevedore.firm == 1){
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


  getWorkDetails(id: number){
    this.stevedorService.getStevedoreDetails(id).then(data=>{
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



  deleteComponent(item: any) {
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
          this.stevedorService.deleteSystem(Number(this.elementDelete.id))
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
            if(resp.indicator==0){
              this.getWorkDetails(this.stevedorId);
              swal({
               title: 'Elemento eliminado',
               type: 'success'
              });
            } else{
              swal({
                title: 'Este componente tiene asignado partes',
                text: 'Este item no se puede eliminar',
                type: 'error'
               });
            }
           // this.router.navigateByUrl('master/registerBrand');

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
          this.stevedorService.deletePart(Number(this.elementDelete.id))
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
           this.getWorkDetails(this.stevedorId);
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



  updateComponent(components: any){
    this.currentSystem = components;
    console.log( this.currentSystem );
    this.updateComponentForm.get('updateComponent').setValue(this.currentSystem.system_description);
   document.getElementById('showComponent').click();

  }

  sendUpdateComponent(system: any){
    console.log(system);
    if ((system.updateComponent!=null)&&(system.updateComponent!="")) {
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.stevedorService.updateSystem(this.currentSystem.maintenance_system_id,system.updateComponent).then(data=>{
        const resp:any=data;
        // this.headerInfo=resp.data;
        // console.log("header information");
        // console.log(this.headerInfo);
        this.getWorkDetails(this.stevedorId);
        this.generalAlert("Proceso completado","Proceso completado correctamente!","success");
        document.getElementById( 'updateComponentHide').click();
      }).catch(err=>{
        console.log(err);
        this.generalAlert("ha ocurrido un herror","ocurrio un error durante la ecucion","error");
      });
    }else{
      this.generalAlert("ha ocurrido un herror","complete todos los campos obligatorios","error");
    }
  }


  updateParts(row: any){

    this.currentPart = row;
    console.log( this.currentPart );
    this.updatePartForm.get('partDescriptionUpdate').setValue(this.currentPart.part_description);

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
      this.stevedorService.updatePart(this.currentPart.id,description).then(data=>{
        this.getWorkDetails(this.stevedorId);
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
      this.stevedorService.updateStevedore(this.stevedorId,this.routineDescriptionUpdate,this.routineHourUpdate,this.routineObservationUpdate,this.supplicePart,this.deliveryReview,
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
          this.getWorkDetails(this.stevedorId);
        }else{
          this.generalAlert("Ha ocurrido un herror","Ya existe una rutina con este nombre","error");
        }
      }).catch(err=>{
        console.log(err);
        this.generalAlert("ha ocurrido un herror","ocurrio un error durante la ecucion","error");
      });
    }else{
      this.generalAlert("ha ocurrido un herror","complete todos los campos obligatorios","error");
    }
  }


  storageComponent(formValue:any){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log(formValue);
    console.log(formValue.component);
    const system=formValue.component;

    if((system!=null)&&(system!="")){
    this.stevedorService.createSystem(this.stevedorId,this.componentForm.get('component').value).then(data=>{
      const resp:any=data;
      console.log(data);
      console.log(resp);
      if (resp.success==1) {
        this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
       // this.getComponent(this.checklistId);
        this.getWorkDetails(this.stevedorId);
        this.componentForm.reset();
        document.getElementById('storageComponentlHide').click();
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


  currentParts(idComponent:any){
    console.log(JSON.stringify(idComponent));
    console.log(idComponent);
    console.log(idComponent.id);
    this.componentForPart = idComponent.id
    // document.getElementById('storageDetailHide').click();
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
    this.stevedorService.createPart(this.componentForPart,description).then(data=>{
      const resp:any=data;

      console.log(data);
      console.log(resp);
      if (resp.success==1) {
        this.generalAlert('Proceso exitoso','Se ha guardado el detalle correctamente','success');
        this.partForm.reset();
        document.getElementById('storagePartHide').click();
        //this.getPart(this.componentForPart);
        this.getWorkDetails(this.stevedorId);
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



  selectStatuSupplicePart(event:any){
    console.log(event);
    console.log(this.supplicePart);
    if(event.target.checked == true){

      this.supplicePart =  1;
      console.log(this.supplicePart);
    }else{
      this.supplicePart =  0;
    }
    console.log(this.supplicePart);
  }

  selectStatusDeliveryReview(event:any){
    console.log(event);
    console.log(this.deliveryReview);
    if(event.target.checked == true){

      this.deliveryReview =  1;
      console.log(this.deliveryReview);
    }else{
      this.deliveryReview =  0;
    }
    console.log(this.deliveryReview);
  }

  selectStatusPending(event:any){
    console.log(event);
    console.log(this.pending);
    if(event.target.checked == true){

      this.pending =  1;
      console.log(this.pending);
    }else{
      this.pending =  0;
    }
    console.log(this.pending);
  }

  selectStatuSurvey(event:any){
    console.log(event);
    console.log(this.survey);
    if(event.target.checked == true){

      this.survey =  1;
      console.log(this.survey);
    }else{
      this.survey =  0;
    }
    console.log(this.survey);
  }

  selectStatusFirm(event:any){
    console.log(event);
    console.log(this.firm);
    if(event.target.checked == true){

      this.firm =  1;
      console.log(this.firm);
    }else{
      this.firm =  0;
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
    this.router.navigateByUrl('maintenance/stevedores');
  }
  ngOnInit() {
  }

}
