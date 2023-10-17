import { Component, Injectable, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { isContext } from 'vm';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import { UserService } from '../../master-services/User/user.service';

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

interface statusForkliftInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

@Component({
  selector: 'app-master-status-forklift',
  templateUrl: './master-status-forklift.component.html',
  styleUrls: ['./master-status-forklift.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: MasterStatusForkliftComponent}]
})
export class MasterStatusForkliftComponent extends NgbDatepickerI18n {


  selectedRegionalId:any = 0;
  selectedBusinessId: any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedStatusForklift: any = 0;
  customers: any;
  now:any;
  regional:any;
  forklifts:any;

  branchOffices: any;
  rowsClient: any;

  forklift: any = '';
  customerName: any = '';
  branch: any = '';
  descriptionForklift: any = '';

  fromDatePending: NgbDateStruct;
  untilDatePending: NgbDateStruct;
  fromDateLog: NgbDateStruct;
  untilDateLog: NgbDateStruct;

  checkAllType: boolean = false;
  checkAllStatus: boolean;

  type: any;
  status: any;

  currentForklift: any;
  fullName: any;
  pendingGeneral: any;
  forkliftLog: any;
  numberPage=1;
  numberPageLog=1;
  limitPage;
  limitPageLog;
  left: boolean = true;
  right: boolean = false;
  userCustomer: boolean = false;
  user_id: any;
  forkliftStatus: any;
  statusForkliftStatus=[];
  selectedItemsDetail=[];
  itemsSelect=[];

  selectsStatus :Array<statusForkliftInterface> = [];
  selectStatus :statusForkliftInterface;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private resumenesService: ResumenesService,
    private _i18n: I18n, private forkliftService: ForkliftService, private restService: RestService,private userService: UserService) { 
    super();

    var date = new Date();
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
    var ngbDateStructUntil = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};
               
    this.fromDatePending=ngbDateStruct;
    this.untilDatePending=ngbDateStructUntil;
    this.fromDateLog=ngbDateStruct;
    this.untilDateLog=ngbDateStructUntil;

    console.log(   this.fromDatePending);
    console.log(   this.fromDatePending);

    if(Number(localStorage.getItem('profile')) == 6 || Number(localStorage.getItem('profile')) == 7){
      this.user_id = Number(localStorage.getItem('userid'));
      this.getCustomerUser(this.user_id);
      this.userCustomer = true;
    }else{
    this.getRegional();
    }

    this.getStatusForklift();
    // this.getFilters();
  }
  getCustomerUser(id: any) {
    this.userService.getUserCustomer(id).then(data => {
      const resp: any = data;
      this.customers = resp.data;
      // console.log(this.customers)
    }).catch(error => {
      console.log(error);
    });
  }

  /*getForkliftStatus () {
    this.forkliftService.getForkliftStatus().then(data => {
      const resp: any = data;
      this.forkliftStatus = resp.data;
      // console.log(this.customers)
    }).catch(error => {
      console.log(error);
    });
  }*/

  checkChangeActive(event:any, item:any){
   
    
    console.log('valor para editar');
    console.log(event);
    console.log(item);
    console.log(item.id);
    console.log(this.checkAllType);
    this.checkAllType=false;
    for (let j = 0; j < this.selectsStatus.length; j++){
      console.log(this.selectsStatus.length);
      if (this.selectsStatus[j].id == item.id){
       this.selectsStatus[j].select=event.target.checked;
       if(event.target.checked==true){
         let id = item.id
        this.selectedItemsDetail.push(id);
       }else{
        var index = this.selectedItemsDetail.indexOf(item.id);
        if (index !== -1) {
            this.selectedItemsDetail.splice(index, 1);
        }
       }
     }
    }
   console.log('Consolidado: '+this.selectedItemsDetail);
   if( this.selectedRegionalId !=0 && this.selectedBusinessId!=0 ){
   this.getFilters();
   }else {
    swal({
      title:'Error',
      text: 'Debe seleccionar una sucursal y un cliente',
      type: 'warning'
     });
   }

  }
  


  checkUncheckAllType(event:any){  
    this.selectedItemsDetail=[];
      for (let j = 0; j < this.selectsStatus.length; j++){
        if(event.target.checked){
          this.selectsStatus[j].select=event.target.checked;
          this.selectedItemsDetail.push(this.selectsStatus[j].id);
        }else{
          this.selectsStatus[j].select=false;
          var index = this.selectedItemsDetail.indexOf(this.selectsStatus[j].id);
          if (index !== -1) {
              this.selectedItemsDetail.splice(index, 1);
          }
       }
      }
      
      let dataArr = new Set(this.selectedItemsDetail);
   console.log('Consolidado: '+this.selectedItemsDetail);

   if( this.selectedRegionalId !=0 && this.selectedBusinessId!=0 ){
   this.getFilters();
   }else {
    swal({
      title:'Error',
      text: 'Debe seleccionar una sucursal y un cliente',
      type: 'warning'
     });
   }
  }
  
   getStatusForklift(){
    this.forkliftService.getForkliftStatus().then(data => {
      console.log('esta es la data de estados');
      console.log(JSON.stringify(data));
      const resp: any = data;
      console.log(data);
      swal.close();
      this.type  = resp.data;
      for(let item of this.type){
        this.selectStatus = {
          id:item.id,
          name:item.description,
          select:false,
        }
        this.selectsStatus.push(this.selectStatus);
      }
    }).catch(error => {
      console.log(error);
      swal({
        title:'Error',
        text: 'Ha ocurrido un error al cargar las Sucursales',
        type: 'error'
       });
    });
  }

  
  getBranchOfficeUser() {
    swal({
      title: 'Validando información ...',
      text:'Cargando Sedes',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.userService.getBranchUser(this.selectedBusinessId,this.user_id).then(data => {
      const resp: any = data;
      this.branchOffices = resp.data;
      // console.log(this.customers)
      swal.close();
    }).catch(error => {
      console.log(error);
    });
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
    this.selectedBusinessId = 0;
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
    this.selectedBranchOfficeId=0;
    if(this.selectedBusinessId!=0){
    
    // Llenar información de cliente  
    this.restService.getOffice(this.selectedBusinessId.id).then(data => {
      const resp: any = data;
      swal.close();

      this.branchOffices  = resp.data;
    }).catch(error => {
      console.log(error);
    });
  
   
    }else{
      this.selectedBranchOfficeId=0;
    
    }
  }
  
  
getForklifs() {
  this.selectedForkliftId = 0;
  if (this.selectedBranchOfficeId != 0) {
    console.log('this.selectedBusinessId.id');
    console.log(this.selectedBranchOfficeId.id);

    this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId.id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.forklifts = resp.data;

    }).catch(error => {
      console.log(error);
    });
  } else {

  }
}

  getFilters() {
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      let params='';
      let cont=0;



      if(this.selectedBusinessId!=0){
      console.log('imprimir cont');
        console.log(cont);
        if(cont>0){
          params=params+'&&customer_id='+this.selectedBusinessId.id;
        }else{
          params=params+'customer_id='+this.selectedBusinessId.id;
          cont++;
        }     
      }

      if(this.selectedForkliftId!=0){
        if(cont>0){
          params=params+'&&forklift_id='+this.selectedForkliftId.id;
        }else{
          params=params+'forklift_id='+this.selectedForkliftId.id;
          cont++;
        }
      }

      if(this.selectedBranchOfficeId!=0){
      console.log(cont);
        if(cont>0){
        params=params+'&&branch_office_id='+this.selectedBranchOfficeId.id;
        }else{
          params=params+'branch_office_id='+this.selectedBranchOfficeId.id;
          cont++;
        }
      }

      if(this.selectedItemsDetail.length>0){
        console.log(cont);
          if(cont>0){
          params=params+'&&forklift_status='+this.selectedItemsDetail.toString();
          }else{
            params=params+'forklift_estatus='+this.selectedItemsDetail.toString();
            cont++;
          }
        }

      console.log('.---------->'+params);
      this.resumenesService.showFilter(params).then(data => {
        const resp: any = data;
        console.log('info de filter');
        console.log(data);
      // this.customers  = resp.data;
        this.rowsClient = resp.data;
        console.log(resp.error);
        swal.close();
        if(resp.error){
          console.log('entro')
          swal({
            title:'Oops',
            text: 'Hubo un error en la consulta.',
            type: 'error'
            });
        }
      }).catch(error => {
        console.log(error);
      });  
  }

  showModalRegister(row: any){
    this.currentForklift = row;
    if(row.status_active){
      this.selectedStatusForklift = row.status_active;
    }else{
      this.selectedStatusForklift =0;
    }
  
    this.fullName = row.full_name;
    this.descriptionForklift = row.description_status;
    document.getElementById('showAssignInvoice').click();
  }

  getForkliftPendingGeneralMain(row){
    // Llenar información de cliente  
    this.resumenesService.getForkliftPendingGeneral(row.id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.pendingGeneral  = resp.data; 
      document.getElementById('showPending').click();
    }).catch(error => {
      console.log(error);
    });
  }

  registerStatusType(){

    console.log('esta es la data de forklift');
    console.log(JSON.stringify(this.currentForklift));

    if(this.currentForklift.status_active == 1 || this.currentForklift.status_active == 5){
      console.log('ingreso a la condición');
      this.registerStatus();//Registro Normal
    }else{
      console.log('ingreso a la condición 2');
      this.registerStatusTime(); //Registro Time Out
    }
  }

  registerStatus(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    let params='';
    let cont=0;

    if(this.selectedStatusForklift != 0){
        if(cont>0){
          params=params+'&forklift_id='+this.currentForklift.id;
        }else{
          params=params+'forklift_id='+this.currentForklift.id;
          cont++;
        }

      console.log(cont);
        if(cont>0){
        params=params+'&status='+this.selectedStatusForklift;
        }else{
          params=params+'status='+this.selectedStatusForklift;
          cont++;
        }
        if(cont>0){
        params=params+'&description='+this.descriptionForklift;
        }else{
          params=params+'description='+this.descriptionForklift;
          cont++;
        }
        params=params+'&user_id='+localStorage.getItem('userid');
        

        this.forkliftService.saveStatusForklift(params).then(data => {
          const resp: any = data;
          console.log(resp);
          this.rowsClient = resp.data;
          swal.close();
          this.getFilters();
          document.getElementById('assignUpdateCorrectiveHide').click();
          if(resp.error){
            console.log('entro')
            swal({
              title:'Oops',
              text: 'Hubo un error en la consulta.',
              type: 'error'
              });
          }
        }).catch(error => {
          console.log(error);
        });
    }else{
      swal({
        title:'Oops',
        text: 'Debes seleccionar un estado.',
        type: 'error'
        });
    }
  }
  registerStatusTime(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    let params='';
    let cont=0;

    if(this.selectedStatusForklift != 0){
        if(cont>0){
          params=params+'&forklift_id='+this.currentForklift.id;
        }else{
          params=params+'forklift_id='+this.currentForklift.id;
          cont++;
        }

      console.log(cont);
        if(cont>0){
        params=params+'&status='+this.selectedStatusForklift;
        }else{
          params=params+'status='+this.selectedStatusForklift;
          cont++;
        }
        if(cont>0){
        params=params+'&description='+this.descriptionForklift;
        }else{
          params=params+'description='+this.descriptionForklift;
          cont++;
        }

        this.forkliftService.saveStatusForkliftTime(params).then(data => {
          const resp: any = data;
          console.log(resp);
          this.rowsClient = resp.data;
          swal.close();
          this.getFilters();
          document.getElementById('assignUpdateCorrectiveHide').click();
          if(resp.error){
            console.log('entro')
            swal({
              title:'Oops',
              text: 'Hubo un error en la consulta.',
              type: 'error'
              });
          }
        }).catch(error => {
          console.log(error);
        });
    }else{
      swal({
        title:'Oops',
        text: 'Debes seleccionar un estado.',
        type: 'error'
        });
    }
  }

  getLogForklift(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.selectedStatusForklift = this.currentForklift.status_active;
    console.log('Este es el estado'+this.currentForklift.status_active);
    this.fullName = this.currentForklift.full_name;
    this.descriptionForklift = this.currentForklift.description_status;
    let params='';
    let from_date='';
    let to_date='';
  
    var day = (this.fromDateLog.day < 10 ? '0' : '') +this.fromDateLog.day;
     // 01, 02, 03, ... 10, 11, 12
     let month = ((this.fromDateLog.month) < 10 ? '0' : '') + (this.fromDateLog.month);
     // 1970, 1971, ... 2015, 2016, ...
     var year = this.fromDateLog.year;
  
     // until poner los ceros
     var dayUntil = (this.untilDateLog.day < 10 ? '0' : '') +this.untilDateLog.day;
     // 01, 02, 03, ... 10, 11, 12
     let monthUntil = ((this.untilDateLog.month) < 10 ? '0' : '') + (this.untilDateLog.month);
     // 1970, 1971, ... 2015, 2016, ...
     var yearUntil = this.untilDateLog.year;    
  
     var fromD = year +'-'+ month+'-'+ day;
     var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;
  
     //from_date=fromD+' 00:00:00';
     //to_date=untilD+' 23:59:59';
    params = params + 'from_date='+ fromD + ' 00:00:00'+ '&to_date='+untilD+ ' 23:59:59';
    params=params+'&forklift_id='+this.currentForklift.id;
    params=params+'&page='+this.numberPageLog;
    console.log('esta es la data de bitacora');
    console.log(params);
        this.forkliftService.getLogForklift(params).then(data => {
          const resp: any = data;
          console.log(resp);
          this.limitPageLog=resp.data.last_page;
          this.forkliftLog = resp.data.data;
          swal.close();
          document.getElementById('showLog').click();
          if(resp.error){
            console.log('entro')
            swal({
              title:'Oops',
              text: 'Hubo un error en la consulta.',
              type: 'error'
              });
          }
        }).catch(error => {
          console.log(error);
        });
  }

  nextPageLog(){
    this.numberPageLog= this.numberPageLog+1;
    this.getLogForklift();
  }
  
  backPageLog(){
    if( this.numberPageLog>1){
    this.numberPageLog= this.numberPageLog-1;
    this.getLogForklift();
    }
  }

  nextPage(){
    this.numberPage= this.numberPage+1;
    this.showPendingForklift();
  }
  
  backPage(){
    if( this.numberPage>1){
    this.numberPage= this.numberPage-1;
    this.showPendingForklift();
    }
  }

  logForklift(row: any){
    this.currentForklift = row;
    this.getLogForklift();
  }

  pendingForklift(row: any){
    this.currentForklift = row;
    this.showPendingForklift();
  }

  showPendingForklift(){
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    let params = '';
    let from_date='';
    let to_date='';
  
    var day = (this.fromDatePending.day < 10 ? '0' : '') +this.fromDatePending.day;
     // 01, 02, 03, ... 10, 11, 12
     let month = ((this.fromDatePending.month) < 10 ? '0' : '') + (this.fromDatePending.month);
     // 1970, 1971, ... 2015, 2016, ...
     var year = this.fromDatePending.year;
  
     // until poner los ceros
     var dayUntil = (this.untilDatePending.day < 10 ? '0' : '') +this.untilDatePending.day;
     // 01, 02, 03, ... 10, 11, 12
     let monthUntil = ((this.untilDatePending.month) < 10 ? '0' : '') + (this.untilDatePending.month);
     // 1970, 1971, ... 2015, 2016, ...
     var yearUntil = this.untilDatePending.year;    
  
     var fromD = year +'-'+ month+'-'+ day;
     var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;
  
     from_date=fromD+' 00:00:00';
     to_date=untilD+' 23:59:59';
     params = params + 'from_date='+fromD + '&to_date='+untilD;
     params=params+'&forklift_id='+this.currentForklift.id;
     params=params+'&page='+this.numberPage;
    swal.showLoading();


    this.forkliftService.getPendingForklift(params).then(data => {
      const resp:any= data;
      console.log(data);
      this.limitPage=resp.data.last_page;
      console.log('limite de paginas '+this.limitPage);
      this.pendingGeneral=resp.data.data;
  
      document.getElementById('showPending').click();
      swal.close();
  
      }).catch(error => {
      console.log(error);
      swal.close();
      });
  } 
 
  onDateSelectionUntil(date: any) {
    var fromD = new Date(this.fromDatePending.year, this.fromDatePending.month, this.fromDatePending.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDatePending.year, this.untilDatePending.month, this.untilDatePending.day);
    if( untilD< fromD){
      console.log('es mayor');
      this.fromDatePending=this.untilDatePending;
    }
  }

onDateSelectionFrom(date: any) {

  if(this.untilDatePending){
  var fromD = new Date(this.fromDatePending.year, this.fromDatePending.month, this.fromDatePending.day); //31 de diciembre de 2015
  var untilD = new Date(this.untilDatePending.year, this.untilDatePending.month, this.untilDatePending.day);

  console.log(this.fromDatePending.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDatePending=this.fromDatePending;
    }
  }
}

  onDateSelectionUntilLog(date: any) {
    var fromD = new Date(this.fromDateLog.year, this.fromDateLog.month, this.fromDateLog.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDateLog.year, this.untilDateLog.month, this.untilDateLog.day);
    if( untilD< fromD){
      console.log('es mayor');
      this.fromDateLog=this.untilDateLog;
    }
  }

onDateSelectionFromLog(date: any) {

  if(this.untilDateLog){
  var fromD = new Date(this.fromDateLog.year, this.fromDateLog.month, this.fromDateLog.day); //31 de diciembre de 2015
  var untilD = new Date(this.untilDateLog.year, this.untilDateLog.month, this.untilDateLog.day);

  console.log(this.fromDateLog.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDateLog=this.fromDateLog;
    }
  }
}

  addCancelUpdateDate() {

    document.getElementById('assignUpdateCorrectiveHide').click();
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

  ngOnInit() {
  }

}
