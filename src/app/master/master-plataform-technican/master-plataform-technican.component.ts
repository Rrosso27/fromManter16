import { Component, Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import { Router } from '@angular/router';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { PlatformsService } from '../../master-services/platforms/platforms.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
interface I18NValues {
  [key: string]: {
    weekdays: string[];
    months: string[];
  };
}

const I18N_VALUES: I18NValues = {
  fr: {
    weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  },
  // Otros idiomas...
};



@Injectable()
export class I18n {
  language = 'fr';
}

interface itemSelectInterface {// item para mostrar selccionados
  id?: number;
  item?: string;
  select?: boolean;
}

@Component({
  selector: 'app-master-plataform-technican',
  templateUrl: './master-plataform-technican.component.html',
  styleUrls: ['./master-plataform-technican.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export abstract class MasterPlataformTechnicanComponent extends NgbDatepickerI18n {

  routineSelecteds: Array <itemSelectInterface> = [];
  routineSelected:any;

  technicianSelecteds: Array <itemSelectInterface> = [];
  technicianSelected: any;

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;
  preventives: any;


  selectedBusinessId: any = 0;
  selectedRegionalId:any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedHourPreventive: any = 0;
  selectedMinutPreventive: any = 0;
  branchOffices: any;
  forklifts: any;
  customers: any;
  regional: any;


  selectedHourUpdatePreventive: any = 0;
  selectedMinutUpdatePreventive: any = 0;

  rowsWork: any;
  technician: any;
  currentPreventive: any;

  technicianUpdate: any;
  preventiveUpdate: any;

  elementDelete: any;

  forkliftText = '';
  rowsClient: any;

  forklift: any = '';
  customerName: any = '';
  branch: any = '';

  technicianList: string='';
  preventiveList: string='';
  oldDate:any;

  consecutive: any;
  corrective: boolean = false;
  preventive: boolean  = false;
  correctiveUpdate: boolean = false;
  preventiveUpda: boolean  = false;

  ngbDateStruct;

  constructor(private restService: RestService, private resumenesService: ResumenesService, private router: Router,
    private forkliftService: ForkliftService, private _i18n: I18n, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private platformService: PlatformsService) {
      super();

      var date = new Date();
      this.ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};
      this.fromDate=this.ngbDateStruct;
      this.untilDate=this.ngbDateStruct;

      this.getRegional();
      this.getPlataform();
      // this.getConsecutive();

    }

    getRegional(){
      this.restService.getRegionalAll().then(data => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.regional  = resp.data;
      }).catch(error => {
        console.log(error);
      });
    }

    getCustomerRegionals() {
      this.restService.getRegionalCustomers(this.selectedRegionalId.id).then(data => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.customers  = resp.data;

        //asignar valores customer;

      }).catch(error => {
        console.log(error);
      });
     }



    getBranchOffices() {
      if(this.selectedBusinessId!=0){

      // Llenar información de cliente
      this.restService.getOffice(this.selectedBusinessId.id).then(data => {
        const resp: any = data;
        console.log('oficinas: '+data);
        Swal.close();
        this.branchOffices  = resp.data;
      }).catch(error => {
        console.log(error);
      });


      }else{
        this.selectedBranchOfficeId=0;
        this.selectedForkliftId=0;
      }
    }

    getForklifs() {
      if(this.selectedBranchOfficeId!=0){
      console.log('this.selectedBusinessId.id');
      console.log(this.selectedBranchOfficeId.id);

    this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId.id).then(data => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.forklifts  = resp.data;

      }).catch(error => {
        console.log(error);
      });
    }else{

    }
  }

  getPlataform() {
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.platformService.getPlatforms().then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        console.log(data);
        Swal.close();
        this.rowsWork = resp.data;
        for (let item of  this.rowsWork) {
          // console.log(item); // 1, "string", false
          let itemSelectInterface:itemSelectInterface = {
            id: item.id,
            item: item.description,
            select: false
          }
          this.routineSelected= itemSelectInterface
          this.routineSelecteds.push(this.routineSelected);
      }

      console.log("ole ole");
      console.log(this.routineSelecteds);


        console.log( this.rowsWork);
    }
    }).catch(error => {
      Swal.close();
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });
  }

  showAssing(){
    if(this.selectedRegionalId==0 || this.selectedBusinessId==0 || this.selectedBranchOfficeId==0){
     Swal.fire({
       title:'Importante',
       text: 'Debes seleccionar todos los filtros.',
       icon: 'warning'
      });
    }else{
      this.getTechnician(this.selectedRegionalId,this.selectedBusinessId);
      document.getElementById('showAssing')?.click();
    }
  }

  getConsecutive() {

    this.platformService.showPlatformConsecutive().then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.consecutive  = resp.data;
      var date = new Date();

      let now = date.getFullYear();


      // 01, 02, 03, ... 10, 11, 12
      let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);


      let yearCosecutive=date.getFullYear().toString().substring(2,4);
      this.consecutive= Number(this.consecutive.consecutive)+1;
      this.consecutive = Number(yearCosecutive.toString()+month.toString()+this.consecutive.toString());

      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }

  getPlataformRoutines(){
    // Llenar información de cliente
    if(this.selectedRegionalId==0 || this.selectedBusinessId==0 || this.selectedBranchOfficeId==0 ){
      Swal.fire({
        title:'Importante',
        text: 'Debes seleccionar todos los filtros.',
        icon: 'warning'
       });
    }else{
      Swal.fire({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      Swal.showLoading();

    this.platformService.getPlatformsForklist(this.selectedBranchOfficeId.id).then(data => {
      const resp: any = data;
      console.log(data);
      Swal.close();
      this.currentPreventive  = resp.data;


    }).catch(error => {
      console.log(error);
    });
  }
  }

  update(row:any){
    console.log('entro');
    // this.getTechnician(this.selectedRegionalId);
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log(this.selectedRegionalId);
    this.restService.getUserRegional(this.selectedRegionalId.id,this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        console.log(data);
        Swal.close();
        this.technician = resp.data;
        // console.log(JSON.parse(this.technician));
        for (let item of  this.technician) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          let itemSelectInterface:itemSelectInterface = {
            id: item.id,
            item: item.name,
            select: false
          }
          this.technicianSelected= itemSelectInterface
          this.technicianSelecteds.push(this.technicianSelected);

    }
    console.log( this.technicianSelecteds);
        console.log( this.technician);
        this.updateDate(row);
  }
    }).catch(error => {
      Swal.close();
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });

  }

  updateDate(row: any){
    // this.getTechnician(this.selectedRegionalId);
    console.log(row);
    this.preventiveUpdate = row.result.preventiveRoutines;
    this.technicianUpdate = row.result.technicians;
    this.oldDate = row.date;
    if(this.preventiveUpdate[0].type_maintenance==0){
      document.getElementById('preventiveUpdate')?.click();
    }
    if(this.preventiveUpdate[0].type_maintenance==1){
      document.getElementById('correctiveUpdate')?.click();
    }

    let date = row.date;
    console.log(date)
    let dateComplete = date.substring(0,10);
    let dateArray = dateComplete.split('-');

    let hourComplete =  date.substring(10,19);
    let hourArray = hourComplete.split(':');
    this.selectedHourUpdatePreventive = Number(hourArray[0]);
    this.selectedMinutUpdatePreventive = Number(hourArray[1]);

    console.log(hourComplete);
    let year = Number(dateArray[0]);
    let mounth = Number(dateArray[1]);
    let day = Number(dateArray[2]);
    var news: NgbDateStruct = { year: year, month: mounth, day: day };
    console.log(news);
    this.untilDate=news;

    for (let elemento of this.preventiveUpdate) {
      console.log('ingreso a mirar checks');
      this.SelectItemRoutines(elemento);
      }

    for (let elemento of this.technicianUpdate) {
      console.log('ingreso a mirar checks');
      this.SelectItemTechnician(elemento);
      }

      document.getElementById( 'showUpdatePreventive')?.click();
  }

  deletePlataformTechinician(item: any) {
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
          console.log(this.elementDelete);
          console.log(this.elementDelete.result);
          console.log(this.elementDelete.result.technicians);
          var rout = '';
          var tech = '';
          for (let routin of this.elementDelete.result.preventiveRoutines){

            rout = rout + routin.id + ','

          }

          for (let tec of this.elementDelete.result.technicians){

            tech = tech + tec.id + ','

          }

          console.log(rout);
          console.log(tech);
          Swal.showLoading();
          this.platformService.deletePlatformsTechnician(Number(this.selectedForkliftId.id),rout,tech)
          .then(data => {
            Swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Esta rutina presenta problemas',
                text: 'Esta rutina no se puede eliminar',
                icon: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           Swal.fire({
            title: 'Elemento eliminado',
            icon: 'success'
           });

           this.getPlataformRoutines();
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

  updatePlatforms(){
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let params;
     // poner los 0
     var day = (this.untilDate.day < 10 ? '0' : '') +this.untilDate.day;
     // 01, 02, 03, ... 10, 11, 12
     let month = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
     // 1970, 1971, ... 2015, 2016, ...
     var year = this.untilDate.year;

     console.log( this.selectedHourUpdatePreventive);
     console.log( this.selectedMinutUpdatePreventive);

     var hour = this.selectedHourUpdatePreventive;
     var minut = this.selectedMinutUpdatePreventive;


     console.log(hour);
     console.log( minut);


     var fromD = year +'-'+ month+'-'+ day+' '+hour+':'+minut + ':00';
     console.log( fromD);
     //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
     // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
     params=fromD;

     console.log('entro');
      console.log(this.routineSelecteds);


      let type:any;
      if((this.preventiveUpda== false) && (this.correctiveUpdate==false)){
        Swal.fire({
          title:'Error',
          text: 'Debes saleccionar el tipo de mantenimiento',
          icon: 'error'
        });
      }else{
        if(this.preventiveUpda){
          type = 0;
        }
        if(this.correctiveUpdate){
          type = 1;
        }
        console.log(type);

      for (let item of this.routineSelecteds) {
        // console.log('entro');
        if(item.select){
         console.log(item);
         console.log('entro');
          this.preventiveList = this.preventiveList + item.id +',';
          // console.log('entro');
        }
      }

      if(this.preventiveList==''){
        Swal.fire({
          title:'Error',
          text: 'Debes saleccionar al menos una rutina de plataforma',
          icon: 'error'
        });
      }else{

      let tec =[];
      console.log(this.technicianSelecteds);
      for (let item of this.technicianSelecteds) {
        // console.log('entro');
        if(item.select){
          console.log(item);
          console.log('entro');
            this.technicianList = this.technicianList + item.id +',';
            tec.push(item.id);
          }
        }

        if(this.technicianList==''){
          Swal.fire({
            title:'Error',
            text: 'Debes saleccionar al menos un tecnico',
            icon: 'error'
          });
        }else{
        console.log(this.forklift);
        this.platformService.updatePlatform(this.selectedForkliftId.id,this.selectedBusinessId.id,this.selectedBranchOfficeId.id,this.preventiveList,this.technicianList,this.oldDate,params,this.consecutive,type).then(data => {
          const resp: any = data;
          console.log(data);
          if (resp.success == false) {
            Swal.fire({
              title:'Error',
              text: 'Ha ocurrido un error',
              icon: 'error'
             });
          } else {
          Swal.close();

          let result  = resp.data;
          console.log(result);

          this.platformService.updateConsecutivePlatform().then(data => {
            const resp: any = data;
            console.log(data);
            // let message = 'Se ha realizado una asignación de mantenimiento de plataforma  en: '+this.selectedBusinessId.business_name+' para el: ' + params;
            // this.notificationTechnician(tec,message);
            document.getElementById('assingUpdatePrevetiveHide')?.click();

            this.getPlataformRoutines();
            Swal.fire({
              title: 'Guardado con exito',
              icon: 'success'
             });

            this.cleanSelectRoutines();
            // this.cleanSelectTechnician();
            this.technicianSelecteds.length=0;
            this.preventiveList = '';
            this.technicianList = '';
            this.fromDate=this.ngbDateStruct;
            if(this.preventiveUpda){
              document.getElementById('preventiveUpdate')?.click();
            }
            if(this.correctiveUpdate){
              document.getElementById('correctiveUpdate')?.click();
            }
            // this.untilDate=ngbDateStruct;
             console.log('llego hasta aqui');

            Swal.close();
            // this.rowsClient = resp.data;
            // this.rowStatic =  resp.data;
            // this.rowsTemp = resp.data;
            // console.log( this.rowsClient);
          }).catch(error => {
            Swal.fire({
              title: 'Se presento un problema, para guardar este encabezado de manteminiento preventivo',
              icon: 'error'
             });
            console.log(error);
          });
        }
          }).catch(error => {
            Swal.close();
            Swal.fire({
              title:'Error',
              text: 'Ha ocurrido un error',
              icon: 'error'
            });
            console.log(error);
          });
        }
      }
    }
  }

  cleanSelectRoutines(){
    this.routineSelecteds.map(function(dato){
      //if(dato.Modelo == modelo){
        dato.select = false;
      //}

      return dato;
    });
  }

  cleanSelectTechnician(){
    this.technicianSelecteds.map(function(dato){
      //if(dato.Modelo == modelo){
        dato.select = false;
      //}

      return dato;
    });
  }

  SelectItemRoutines(idItem: any){// Falta organizarlo
    var item = idItem.platform_id;
    this.routineSelecteds.map(function(dato){

      console.log(idItem);
      console.log(dato);
      if(Number(dato.id) === Number(item)){
        dato.select = true;
        console.log('hacer cambio');
      }

      return dato;
    });
  }

  SelectItemTechnician(idTechnician: any){// Falta organizarlo
    var tech = idTechnician.user_id
    console.log('jajaja');
    console.log(this.technicianSelecteds);
    this.technicianSelecteds.map(function(dato){
      if(dato.id == tech){
       dato.select = true;
       console.log('ingreso');
    }
      return dato;
    });
  }

  addCancelDate(){
    //If exist, remove the date
    // let value = document.getElementsByName('typem').forEach(x => {
    //   x.checked = false
    // });

    this.cleanSelectRoutines();
              // this.cleanSelectTechnician();
              this.technicianSelecteds.length=0;
    document.getElementById( 'assignPrevetiveHide')?.click();
}
  addCancelUpdateDate(){
    //If exist, remove the date


    this.cleanSelectRoutines();
    // this.cleanSelectTechnician();
    this.technicianSelecteds.length=0;
    document.getElementById( 'assingUpdatePrevetiveHide')?.click();
}


  ngOnInit() {
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }


  getTechnician(regional_id: any,customer:any){
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log(regional_id);
    this.restService.getUserRegional(regional_id.id,customer.id).then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title:'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
         });
      } else {
        console.log(data);
        Swal.close();
        this.technician = resp.data;
        // console.log(JSON.parse(this.technician));
        for (let item of  this.technician) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          let itemSelectInterface:itemSelectInterface = {
            id: item.id,
            item: item.name,
            select: false
          }
          this.technicianSelected= itemSelectInterface
          this.technicianSelecteds.push(this.technicianSelected);

    }
    console.log( this.technicianSelecteds);
        console.log( this.technician);
  }
    }).catch(error => {
      Swal.close();
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
       });
      console.log(error);
    });
  }


  onDateSelectionFrom(date: any) {


    var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);

    console.log(this.fromDate.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDate=this.fromDate;
    }
  }

   onDateSelectionUntil(date: any) {
      var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
      var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);
      if( untilD< fromD){
        console.log('es mayor');
        this.fromDate=this.untilDate;
      }
  }



  createPlatforms(){
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let params;
     // poner los 0
     var day = (this.fromDate.day < 10 ? '0' : '') +this.fromDate.day;
     // 01, 02, 03, ... 10, 11, 12
     let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
     // 1970, 1971, ... 2015, 2016, ...
     var year = this.fromDate.year;

     console.log( this.selectedHourPreventive);
     console.log( this.selectedMinutPreventive);

     var hour = this.selectedHourPreventive;
     var minut = this.selectedMinutPreventive;

     console.log(hour);
     console.log( minut);


     var fromD = year +'-'+ month+'-'+ day+' '+hour+':'+minut+':00';
     console.log( fromD);
     //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
     // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
     params=fromD;

      console.log('entro');
      console.log(this.routineSelecteds);
      console.log(this.consecutive);
      let type:any;
    if((this.preventive== false) && (this.corrective==false)){
        Swal.fire({
          title:'Error',
          text: 'Debes saleccionar el tipo de mantenimiento',
          icon: 'error'
        });
    }else{
        if(this.preventive){
          type = 0;
        }
        if(this.corrective){
          type = 1;
        }
        console.log(type);

      for (let item of this.routineSelecteds) {
        // console.log('entro');
        if(item.select){
         console.log(item);
         console.log('entro');
          this.preventiveList = this.preventiveList + item.id +',';
          // console.log('entro');
        }
      }

      if(this.preventiveList==''){
        Swal.fire({
          title:'Error',
          text: 'Debes saleccionar al menos una rutina de plataforma',
          icon: 'error'
        });
      }else{

      let tec = [];
      console.log(this.technicianSelecteds);
      for (let item of this.technicianSelecteds) {
        // console.log('entro');
        if(item.select){
          console.log(item);
          console.log('entro');
            this.technicianList = this.technicianList + item.id +',';
            tec.push(item.id)
          }
        }

        if(this.technicianList==''){
          Swal.fire({
            title:'Error',
            text: 'Debes saleccionar al menos un tecnico',
            icon: 'error'
          });
        }else{

        console.log(this.forklift);
        this.platformService.storePlatform(this.selectedBusinessId.id,this.selectedBranchOfficeId.id,this.preventiveList,this.technicianList, Number(this.consecutive),params,type).then(data => {
          const resp: any = data;
          console.log(data);
          if (resp.success == false) {
            Swal.fire({
              title:'Error',
              text: 'Ha ocurrido un error',
              icon: 'error'
             });
          } else {
          Swal.close();

          let result  = resp.data;
          console.log(result);

          this.platformService.updateConsecutivePlatform().then(data => {
            const resp: any = data;
            console.log(data);

            document.getElementById('assignPrevetiveHide')?.click();
            // let message = 'Se ha realizado una asignación de mantenimiento de plataforma  en: '+this.selectedBusinessId.business_name+' para el: ' + params;
            // this.notificationTechnician(tec,message);
            this.getPlataformRoutines();
            Swal.fire({
              title: 'Guardado con exito',
              icon: 'success'
             });

             this.cleanSelectRoutines();
            // this.cleanSelectTechnician();
            this.technicianSelecteds.length=0;
            this.preventiveList = '';
            this.technicianList = '';
            this.fromDate=this.ngbDateStruct;
            // let value = document.getElementsByName('typem').forEach(x => {
            //   x.checked = false
            // });
            // this.untilDate=ngbDateStruct;
             console.log('llego hasta aqui');

            Swal.close();
            // this.rowsClient = resp.data;
            // this.rowStatic =  resp.data;
            // this.rowsTemp = resp.data;
            // console.log( this.rowsClient);
          }).catch(error => {
            Swal.fire({
              title: 'Se presento un problema, para guardar este encabezado de manteminiento preventivo',
              icon: 'error'
             });
            console.log(error);
          });
        }
          }).catch(error => {
            Swal.close();
            Swal.fire({
              title:'Error',
              text: 'Ha ocurrido un error',
              icon: 'error'
            });
            console.log(error);
          });
        }
      }
    }
  }



  // notificationTechnician(tec: any,message:string){

  //   this.resumenesService.notificationTechnicians(message,tec).then(data => {
  //     const resp: any = data;
  //     console.log(data);

  //     Swal({
  //       title: 'Se ha enviado una notifiación al(los) técnico(s) encargado(s)',
  //       type: 'success'
  //     });

  //   }).catch(error => {
  //     Swal({
  //       title: 'Se presento un problema, para realizar la notificación',
  //       type: 'error'
  //     });
  //     console.log(error);
  //   });
  // }


  selectTypeMaintenancePre(){
    this.preventive =  true;
      if(this.corrective){
        this.corrective =  false;
      }
  }

  selectTypeMaintenanceCo(){
    this.corrective = true;
      if(this.preventive){
        this.preventive = false;
      }
    console.log(this.corrective);
  }

  selectTypeMaintenanceUpdatePre(){
    this.preventiveUpda =  true;
      if(this.correctiveUpdate){
        this.correctiveUpdate = false;
      }
    console.log(this.preventiveUpda);
  }

  selectTypeMaintenanceUpdateCo(){
    this.correctiveUpdate = true;
      if(this.preventiveUpda){
        this.preventiveUpda = false;
      }
    console.log(this.correctiveUpdate);
  }

}
