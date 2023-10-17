import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformsService } from '../../master-services/platforms/platforms.service';

import { StevedoreService } from '../../master-services/stevedore/stevedore.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-master-register-stevedore',
  templateUrl: './master-register-stevedore.component.html',
  styleUrls: ['./master-register-stevedore.component.scss']
})
export class MasterRegisterStevedoreComponent implements OnInit {

  @Input()
  routineDescription:string = '';
  routineHour:number = 0;
  routineObservation:string = '';
  routineDescriptionUpdate:string = '';
  routineHourUpdate:number = 0;
  routineObservationUpdate:string = '';



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

  constructor(private stevedorService:StevedoreService, private router: Router) { }


  registerheader(){
    console.log(this.routineDescription);
    if ((this.routineDescription!=null) || (this.routineDescription!="") || (this.routineHour==null)) {
      Swal.fire({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      console.log(1+','+this.routineDescription+','+this.routineHour+','+this.routineObservation);
      this.stevedorService.storeStevedore(this.routineDescription,this.routineHour,this.routineObservation,this.supplicePart,this.deliveryReview,
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

          this.router.navigateByUrl('maintenance/stevedoresUpdate/'+this.headerId)
        }else{
          this.generalAlert("Ha ocurrido un error","Ya existe una rutina con este nombre","error");
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
    this.router.navigateByUrl('maintenance/stevedores');
  }

  ngOnInit() {
  }

}
