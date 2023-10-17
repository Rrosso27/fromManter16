import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { ReportsService } from '../../master-services/reports/reports.service';
import { RestService } from '../../master-services/Rest/rest.service';
// import * as FileSaver from 'file-saver';

import * as FileSaver from 'file-saver';

import Swal from 'sweetalert2/dist/sweetalert2.js'

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

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

interface bussnessInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface typeMaintenanceInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface statusMaintenanceInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface busnessOfficeInterface {// item para mostrar clientes
  customer?: string;
  office?: Array<officeInterface>;
}

interface officeInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface OfficeForkliftInterface {// item para mostrar clientes
  office?: string;
  forklift?: Array<forkliftInterface>;
}

interface forkliftInterface {// item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface tableInterface {
  Cliente?: string;
  Tipo?:string,
  Total_Asignados?:number,
  Total_Finalizados?:number,
  Indicador_Cumplimiento?: string
}

@Component({
  selector: 'app-master-compliance-indicator-maintenance',
  templateUrl: './master-compliance-indicator-maintenance.component.html',
  styleUrls: ['./master-compliance-indicator-maintenance.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: MasterComplianceIndicatorMaintenanceComponent}]
})
export class MasterComplianceIndicatorMaintenanceComponent extends NgbDatepickerI18n {


  selectsBusness :Array<bussnessInterface> = [];
  selectBusness :bussnessInterface;
  selectsBusnessOffices :Array<busnessOfficeInterface> = [];
  selectsBusnessOffice :busnessOfficeInterface;
  selectsOffices :Array<officeInterface> = [];
  selectOffice :officeInterface;
  selectsOfficeForklift :Array<OfficeForkliftInterface> = [];
  selectOfficeForklift :OfficeForkliftInterface;
  selectsForklift :Array<forkliftInterface> = [];
  selectForklift :forkliftInterface;
  selectsType :Array<typeMaintenanceInterface> = [];
  selectType :typeMaintenanceInterface;

  dataExcels :Array<tableInterface> = [];
  dataExcel :tableInterface;

  selectedBusinessId: any = 0;
  selectedRegionalId:any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedStatus: any = 0;
  selectedType: any = 0;

  branchOffices: any;
  forklifts: any;
  customers: any;
  regional:any;
  rowsClient: any;
  type: any;
  status: any;
  checkAllType: boolean;
  checkAllStatus: boolean;

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;

  buttonRadio: any = 0;
  forkView : boolean = false;

  constructor(private restService: RestService, public formatter: NgbDateParserFormatter,
    private _i18n: I18n,private forkliftService: ForkliftService, private reportService: ReportsService) {

    super();

    var date = new Date();
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};

    this.fromDate=ngbDateStruct;
    this.untilDate=ngbDateStruct;


    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.getRegional();
    // this.getTyeMaintenance();

   }

   getTyeMaintenance(){
    this.reportService.getTyeMaintenance().then(data => {
      const resp: any = data;
      swal.close();
      this.type  = resp.data;
      for(let item of this.type){
        this.selectType = {
          id:item.id,
          name:item.description,
          select:false,
        }
        this.selectsType.push(this.selectType);
      }
    }).catch(error => {
      swal({
        title:'Error',
        text: error,
        type: 'error'
       });
    });
  }

   getRegional(){
    this.restService.getRegionalAll().then(data => {
      const resp: any = data;
      swal.close();
      this.regional  = resp.data;
    }).catch(error => {
      swal({
        title:'Error',
        text: error,
        type: 'error'
       });
    });
  }

  getCustomerRegionals() {
    this.selectsBusness.length = 0;
    this.selectsBusness = [];
    this.selectsBusnessOffices=[];
    this.selectsOfficeForklift = [];
    if(this.selectedRegionalId!=0){
      this.restService.getRegionalCustomers(this.selectedRegionalId.id).then(data => {
        const resp: any = data;
        swal.close();
        this.customers  = resp.data;
        for(let item of this.customers){
          this.selectBusness ={
            id:item.id,
            name:item.business_name,
            select:false
          }
          this.selectsBusness.push(this.selectBusness)
        }
      }).catch(error => {
        swal({
          title:'Error',
          text: error,
          type: 'error'
         });
      });
    }


   }

  getBranchOffices() {

    this.selectsOffices= [];
    this.selectsBusnessOffices=[];

    // Llenar información de cliente
    for(let item of this.selectsBusness){
      this.selectsOffices = [];
      if(item.select){
      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

        this.restService.getOffice(item.id).then(data => {
          const resp: any = data;

          if(resp.data.error){
            swal({
              title:'Error',
              text: 'Ha ocurrido un error las sedes',
              type: 'error'
             });
          }
          for(let value of resp.data){
            this.selectOffice = {
              id:value.id,
              name:value.branch_name,
              select:false,
            }
            this.selectsOffices.push(this.selectOffice)
          }

          this.selectsBusnessOffice = {
            customer:item.name,
            office:this.selectsOffices
          }
          this.selectsBusnessOffices.push(this.selectsBusnessOffice);
          this.selectsOffices = [];
          swal.close();
        }).catch(error => {
          swal({
            title:'Error',
            text: error,
            type: 'error'
           });
        });
      }
    }
  }

  getForklifs() {

    this.selectsForklift = [];
    this.selectsOfficeForklift = [];


    for(let value of this.selectsBusnessOffices){
      for(let item of value.office){

        if(item.select){
          swal({
            title: 'Validando información ...',
            allowOutsideClick: false
          });
          swal.showLoading();
          this.forkliftService.getForkliftBranchOfficesFull(item.id).then(data => {
            const resp: any = data;


            this.forklifts  = resp.data;
            for(let item of this.forklifts){
              this.selectForklift ={
                id:item.id,
                name:item.full_name,
                select:false
              }
              this.selectsForklift.push(this.selectForklift)
            }
            this.selectOfficeForklift = {
              office:item.name,
              forklift: this.selectsForklift
            }
            this.selectsOfficeForklift.push(this.selectOfficeForklift);
            this.selectsForklift = [];
            swal.close();
          }).catch(error => {
            swal({
              title:'Error',
              text: error,
              type: 'error'
            });
          });
        }
      }
    }
    // swal.close();
  }

    getFilters() {

      swal({
        title: 'Validando información ...',
        allowOutsideClick: false
      });
      swal.showLoading();

      if(this.selectedRegionalId ==0){

        swal({
          title:'Importante',
          text: 'Debes seleccionar una Sucuarsal.',
          type: 'error'
         });
      }else{
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();

      let params='';
      let cont=0;

      // poner los 0
      var day = (this.fromDate.day < 10 ? '0' : '') +this.fromDate.day;
      // 01, 02, 03, ... 10, 11, 12
      let month = ((this.fromDate.month) < 10 ? '0' : '') + (this.fromDate.month);
      // 1970, 1971, ... 2015, 2016, ...
      var year = this.fromDate.year;

      // until poner los ceros
      var dayUntil = (this.untilDate.day < 10 ? '0' : '') +this.untilDate.day;
      // 01, 02, 03, ... 10, 11, 12
      let monthUntil = ((this.untilDate.month) < 10 ? '0' : '') + (this.untilDate.month);
      // 1970, 1971, ... 2015, 2016, ...
      var yearUntil = this.untilDate.year;

      var fromD = year +'-'+ month+'-'+ day;
      var untilD = yearUntil +'-'+ monthUntil+'-'+ dayUntil;
      //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
      // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
      params='from_date='+ fromD+' 00:00:00'+'&to_date=' +untilD+' 23:59:59&regional=' + this.selectedRegionalId.id;

      let busness = '';
      let forklift = '';
      let office = '';
      if(this.buttonRadio > 0){
        if(this.buttonRadio == 1){
          params = params +'&preventive=preventive';
          cont ++;
        }
        if(this.buttonRadio == 2){
          params = params +'&checklist=checklist';
          cont ++;
        }
        if(this.buttonRadio == 3){
          params = params +'&corrective=corrective';
          cont ++;
        }
        if(this.buttonRadio == 4){
          params = params +'&battery=battery';
          cont ++;
        }
        if(this.buttonRadio == 5){
          params = params +'&platform=platform';
          cont ++;
        }
        if(this.buttonRadio == 6){
          params = params +'&stevedore=stevedore';
          cont ++;
        }

      for (let item of this.selectsBusness) {
        if(item.select){
            busness = busness + item.id +',';
          }
        }
        if(busness!=''){
          params = params + '&customer='+busness;
          for (let value of this.selectsBusnessOffices) {
            for (let item of value.office) {

              if(item.select){
                office = office + item.id +',';
                }

            }
          }
            if(office!=''){
              params = params + '&office='+office;
              if(this.buttonRadio==1 || this.buttonRadio == 2 || this.buttonRadio == 3){
                for (let value of this.selectsOfficeForklift) {
                  for (let item of value.forklift) {
                    if(item.select){
                      forklift = forklift + item.id +',';
                      }
                  }
                    if(forklift != ''){
                      params = params + '&forklift='+forklift;
                    }
                }
              }
            }
        }

      this.reportService.showMintenanceIndicator(params).then(data => {
        const resp: any = data;
        this.rowsClient = resp.data;
        for(let data of resp.data){
              this.dataExcel = {
                Cliente:data.customer,
                Tipo: data.type,
                Total_Asignados:data.total,
                Total_Finalizados:data.finish,
                Indicador_Cumplimiento:data.compliance+'%',
              }
              this.dataExcels.push(this.dataExcel);
        }
        this.exportAsExcelFile(this.dataExcels,'Informe De Cumplimiento De Los Mantenimientos '+fromD+'-'+untilD);
        swal.close();

        if(resp.error){
          swal({
            title:'Oops',
            text: 'Hubo un error en la consulta.',
            type: 'error'
            });
        }
        if(this.rowsClient.length ==0){
          swal({
            title:'Oops',
            text: 'No hay resultado en la consulta.',
            type: 'error'
            });
        }

      }).catch(error => {
        swal({
          title:'Oops',
          text: error,
          type: 'error'
          });
      });

  }else{
    swal({
      title:'Error',
      text: 'Debe seleccionar al menos un tipo de manteminiento.',
      type: 'error'
      });
  }
  }
  }

  changeButtonRadio(value:number){
    if(value == 1 || value == 2 || value == 3){
      this.forkView = true; //Vista de card de equipos
    }else{
      this.forkView = false; // Ocultamiento de card de equipos
    }
    this.buttonRadio = value;
  }

  checkUncheckAllType(event:any){
    this.checkAllType=event.target.checked;
      for (let i = 0; i < this.selectsType.length; i++){
          this.selectsType[i].select=event.target.checked;
      }
  }

    public exportAsExcelFile(rows: any[], excelFileName: string): void {
      if (rows.length > 0) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
        const workbook: XLSX.WorkBook = {Sheets: {'Info Cumplimiento': worksheet}, SheetNames: ['Info Cumplimiento']};

        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }else{
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
        });
      }
    }
    private saveAsExcelFile(buffer: any, baseFileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, baseFileName +EXCEL_EXTENSION);
      swal.close();
      this.dataExcels.length=0;
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


   onDateSelectionFrom(date: any) {

    if(this.untilDate){
    var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);

    if(fromD> untilD){
      this.untilDate=this.fromDate;
    }
  }
  }

  onDateSelectionUntil(date: any) {
    var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);
    if( untilD< fromD){
      this.fromDate=this.untilDate;
    }
}


  ngOnInit() {
  }

}
