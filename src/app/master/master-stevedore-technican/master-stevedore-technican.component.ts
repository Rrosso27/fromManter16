import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import { StevedoreService } from '../../master-services/stevedore/stevedore.service';


const I18N_VALUES = {
  'fr': {
    weekdays: ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
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
  selector: 'app-master-stevedore-technican',
  templateUrl: './master-stevedore-technican.component.html',
  styleUrls: ['./master-stevedore-technican.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: MasterStevedoreTechnicanComponent}]
})
export class MasterStevedoreTechnicanComponent extends NgbDatepickerI18n {

  
  routineSelecteds: Array <itemSelectInterface> = [];
  routineSelected: itemSelectInterface;

  technicianSelecteds: Array <itemSelectInterface> = [];
  technicianSelected: itemSelectInterface;
  
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

  radioPre: boolean  = false;
  radioCo: boolean  = false;

  

  constructor(private restService: RestService,  private router: Router, private forkliftService: ForkliftService, 
    private _i18n: I18n, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private stevedoreService: StevedoreService, private resumenesService: ResumenesService) { 
      super();

      var date = new Date();
      var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};
      this.fromDate=ngbDateStruct;
      this.untilDate=ngbDateStruct;

      this.getRegional();
      this.getStevedores();
      
    }
    
    getRegional(){
      this.restService.getRegionalAll().then(data => {
        const resp: any = data;
        console.log(data);
        swal.close();
        this.regional  = resp.data;
      }).catch(error => {
        console.log(error);
      });
    }

    getCustomerRegionals() {
      this.restService.getRegionalCustomers(this.selectedRegionalId.id).then(data => {
        const resp: any = data;
        console.log(data);
        swal.close();
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
        swal.close();
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
        swal.close();
        this.forklifts  = resp.data;
   
      }).catch(error => {
        console.log(error);
      });
    }else{
      
    }
  }

  getStevedores() {
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.stevedoreService.getStevedore().then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        swal.close();
        this.rowsWork = resp.data;
        for (let item of  this.rowsWork) {
          // console.log(item); // 1, "string", false

          this.routineSelected= {
            id: item.id,
            item: item.description,
            select: false
          }
          this.routineSelecteds.push(this.routineSelected);
      }

      console.log("ole ole");
      console.log(this.routineSelecteds);


        console.log( this.rowsWork);
    }
    }).catch(error => {
      swal.close();
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }

  showAssing(){
    if( this.selectedRegionalId==0 || this.selectedBusinessId==0 || this.selectedBranchOfficeId==0){
     swal({
       title:'Importante',
       text: 'Debes seleccionar todos los filtros.',
       type: 'warning'
      });
    }else{
      this.getTechnician(this.selectedRegionalId,this.selectedBusinessId);
      document.getElementById('showAssing').click();
    }
  }

  getConsecutive() {
   
    this.stevedoreService.showStevedoreConsecutive().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.consecutive  = resp.data;
      var date = new Date();
     
      let now = date.getFullYear();

     
      // 01, 02, 03, ... 10, 11, 12
      let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);

      
      let yearCosecutive=date.getFullYear().toString().substring(2,4);
      this.consecutive= Number(this.consecutive.consecutive)+1;
      this.consecutive = Number(yearCosecutive.toString()+month.toString()+this.consecutive.toString());
      console.log(this.consecutive);
      // this.rowsClient = resp.data;
      // this.rowStatic =  resp.data;
      // this.rowsTemp = resp.data;
      // console.log( this.rowsClient);
    }).catch(error => {
      console.log(error);
    });
   }
   
  getStevedorTechnician(){
    // Llenar información de cliente  
    if( this.selectedRegionalId==0 || this.selectedBusinessId==0 || this.selectedBranchOfficeId==0 ){
      swal({
        title:'Importante',
        text: 'Debes seleccionar todos los filtros.',
        type: 'warning'
       });
    }else{
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

    this.stevedoreService.getStevedoreForklist(this.selectedBranchOfficeId.id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.currentPreventive  = resp.data;

    
    }).catch(error => {
      console.log(error);
    });
  }
  }

  update(row:any){
    console.log('entro');
    // this.getTechnician(this.selectedRegionalId);
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log(this.selectedRegionalId);
    this.restService.getUserRegional(this.selectedRegionalId.id,this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        swal.close();
        this.technician = resp.data;
        // console.log(JSON.parse(this.technician));
        for (let item of  this.technician) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          this.technicianSelected= {
            id: item.id,
            item: item.name,
            select: false
          }
          this.technicianSelecteds.push(this.technicianSelected);
        
    }
    console.log( this.technicianSelecteds);
        console.log( this.technician);
        this.updateDate(row);
  }
    }).catch(error => {
      swal.close();
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
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
      document.getElementById('preventiveUpdate').click();
    }
    if(this.preventiveUpdate[0].type_maintenance==1){
      document.getElementById('correctiveUpdate').click();
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

      document.getElementById( 'showUpdatePreventive').click();
  }

  deleteEstimateDetail(item: any) {
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
          swal.showLoading();
          this.stevedoreService.deleteStevedoreTechnician(Number(this.selectedForkliftId.id),rout,tech)
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log(resp);

            if (resp.success === false) {
              swal({
                title: 'Esta rutina presenta problemas',
                text: 'Esta rutina no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
           swal({
            title: 'Elemento eliminado',
            type: 'success'
           });

           this.getStevedorTechnician();
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

  updatePreventive(){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
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
     
     
     var fromD = year +'-'+ month+'-'+ day+' '+hour+':'+minut;
     console.log( fromD);
     //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
     // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
     params=fromD;

     console.log('entro');
      console.log(this.routineSelecteds);

      let type;
      if((this.preventiveUpda== false) && (this.correctiveUpdate==false)){
        swal({
          title:'Error',
          text: 'Debes saleccionar el tipo de mantenimiento',
          type: 'error'
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
        console.log('entro');
        if(item.select){
         console.log(item);
         console.log('entro');
          this.preventiveList = this.preventiveList + item.id +',';
          console.log('entro');
        }
      }
      if(this.preventiveList==''){
        swal({
          title:'Error',
          text: 'Debes saleccionar al menos una rutina de estibador',
          type: 'error'
        });
      }else{

      let tec = [];
      console.log(this.technicianSelecteds);
      for (let item of this.technicianSelecteds) {
        console.log('entro');
        if(item.select){
          console.log(item);
          console.log('entro');
            this.technicianList = this.technicianList + item.id +',';
            tec.push(item.id);
          }
        }
        if(this.technicianList==''){
          swal({
            title:'Error',
            text: 'Debes saleccionar al menos un tecnico',
            type: 'error'
          });
        }else{
        console.log(this.forklift);
        this.stevedoreService.updateStevedoreTechnician(this.selectedBusinessId.id,this.selectedBranchOfficeId.id,this.preventiveList,this.technicianList,this.oldDate,params,this.consecutive,type).then(data => {
          const resp: any = data;
          console.log(data);
          if (resp.success == false) {
            swal({
              title:'Error',
              text: 'Ha ocurrido un error',
              type: 'error'
             });
          } else {
          swal.close();
          
          let result  = resp.data;
          console.log(result);
          this.stevedoreService.updateConsecutiveStevedore().then(data => {
            const resp: any = data;
            console.log(data);
            // let message = 'Se ha realizado una asignación de mantenimiento de estibadores en: '+this.selectedBusinessId.business_name+' para el : ' + params;
            // this.notificationTechnician(tec,message)
            document.getElementById('assingUpdatePrevetiveHide').click();
          
          this.getStevedorTechnician();
          swal({
            title: 'Guardado con exito',
            type: 'success'
           });
          
          this.cleanSelectRoutines();
          // this.cleanSelectTechnician();
          this.technicianSelecteds.length=0;
          this.preventiveList = '';
          this.technicianList = '';

          let value = document.getElementsByName('typem');
          console.log(value);
            console.log('llego hasta aqui');
    
            swal.close();
            // this.rowsClient = resp.data;
            // this.rowStatic =  resp.data;
            // this.rowsTemp = resp.data;
            // console.log( this.rowsClient);
          }).catch(error => {
            swal({
              title: 'Se presento un problema, para guardar este encabezado de manteminiento preventivo',
              type: 'error'
            });
            console.log(error);
          });
        }
          }).catch(error => {
            swal.close();
            swal({
              title:'Error',
              text: 'Ha ocurrido un error',
              type: 'error'
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
    var item = idItem.stevedore_id;
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
    // document.querySelectorAll('[name=typem]').forEach(x => {
    //     x.checked = false;
    //   });
    //  document.getElementsByName('typem').forEach(x => {
    //   x.checked = false
    // });
          // console.log(value);
          this.preventive = false;
          this.corrective = false;
    this.cleanSelectRoutines();
              // this.cleanSelectTechnician();
              this.technicianSelecteds.length=0;
    document.getElementById( 'assignPrevetiveHide').click();
}
  addCancelUpdateDate(){
    //If exist, remove the date
    this.preventive = false;
    this.corrective = false;
    this.cleanSelectRoutines();
    // this.cleanSelectTechnician();
    this.technicianSelecteds.length=0;
    document.getElementById( 'assingUpdatePrevetiveHide').click();
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
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    console.log(regional_id);
    this.restService.getUserRegional(regional_id.id,customer.id).then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        swal.close();
        this.technician = resp.data;
        // console.log(JSON.parse(this.technician));
        for (let item of  this.technician) {
          console.log(item); // 1, "string", false
          // item = JSON.parse(item);
          this.technicianSelected= {
            id: item.id,
            item: item.name,
            select: false
          }
          this.technicianSelecteds.push(this.technicianSelected);
        
    }
    console.log( this.technicianSelecteds);
        console.log( this.technician);
  }
    }).catch(error => {
      swal.close();
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
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



  createPreventive(){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
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
     let type; 
      console.log('entro');
      console.log(this.routineSelecteds);
      if((this.preventive== false) && (this.corrective==false)){
        swal({
          title:'Error',
          text: 'Debes saleccionar el tipo de mantenimiento',
          type: 'error'
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
        console.log('entro');
        if(item.select){
         console.log(item);
         console.log('entro');
          this.preventiveList = this.preventiveList + item.id +',';
          console.log('entro');
        }
      }
      if(this.preventiveList==''){
        swal({
          title:'Error',
          text: 'Debes saleccionar al menos una rutina de estibador',
          type: 'error'
        });
      }else{
      
      let tec = [];
      console.log(this.technicianSelecteds);
      for (let item of this.technicianSelecteds) {
        console.log('entro');
        if(item.select){
          console.log(item);
          console.log('entro');
            this.technicianList = this.technicianList + item.id +',';
            tec.push(item.id);
          }
        }
        if(this.technicianList==''){
          swal({
            title:'Error',
            text: 'Debes saleccionar al menos un tecnico',
            type: 'error'
          });
        }else{
        console.log(this.forklift);
        this.stevedoreService.storeStevedoreTechnician(this.selectedBusinessId.id,this.selectedBranchOfficeId.id,this.preventiveList,this.technicianList, Number(this.consecutive),params,type).then(data => {
          const resp: any = data;
          console.log(data);
          if (resp.success == false) {
            swal({
              title:'Error',
              text: 'Ha ocurrido un error',
              type: 'error'
             });
          } else {
            swal.close();
            
            let result  = resp.data;
            console.log(result);

            this.stevedoreService.updateConsecutiveStevedore().then(data => {
              const resp: any = data;
              console.log(data);
              // let message = 'Se ha realizado una asignación de mantenimiento de estibadores en: '+this.selectedBusinessId.business_name+' para el : ' + params;
              // this.notificationTechnician(tec,message)
              document.getElementById('assignPrevetiveHide').click();
            
              this.getStevedorTechnician();
              swal({
                title: 'Guardado con exito',
                type: 'success'
              });
              
              this.cleanSelectRoutines();
              // this.cleanSelectTechnician();
              this.technicianSelecteds.length=0;
              this.preventiveList = '';
              this.technicianList = '';
              console.log('llego hasta aqui');
              // let value = document.getElementsByName('typem').forEach(x => {
              //   x.checked = false
              // });
              this.preventive = false;
              this.corrective = false;
              swal.close();
              // this.rowsClient = resp.data;
              // this.rowStatic =  resp.data;
              // this.rowsTemp = resp.data;
              // console.log( this.rowsClient);
            }).catch(error => {
              swal({
                title: 'Se presento un problema, para guardar este encabezado de manteminiento preventivo',
                type: 'error'
              });
              console.log(error);
            });
            }
        }).catch(error => {
            swal.close();
            swal({
              title:'Error',
              text: 'Ha ocurrido un error',
              type: 'error'
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
    
  //     swal({
  //       title: 'Se ha enviado una notifiación al(los) técnico(s) encargado(s)',
  //       type: 'success'
  //     });
      
  //   }).catch(error => {
  //     swal({
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

