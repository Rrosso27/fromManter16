import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import * as Excel from 'exceljs';
// import * as ExcelProper from "exceljs";



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


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


interface TableInterface {
  Actividad?: string;
  Cliente?: string;
  Control?: string;
  Tecnico?:string;
  Fecha_Inicio?: string;
  Fecha_Final?: string;
  Duracion?: string;
}



export class I18n {
  language = 'fr';
}

@Component({
  selector: 'app-master-personal-monitoring',
  templateUrl: './master-personal-monitoring.component.html',
  styleUrls: ['./master-personal-monitoring.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export abstract class  MasterPersonalMonitoringComponent extends NgbDatepickerI18n {

  dataExcel: Array<TableInterface> = [];
  tableExcel:any ;

  selectedRegionalId:any = 0;
  selectedTechnician: any = 0;
  selectedBusinessId: any = 0;
  selectedBranchOfficeId: any = 0;
  customers: any;
  now:any;
  regional:any;

  branchOffices: any;

  technician: any;
  rowsClient: any;

  forklift: any = '';
  customerName: any = '';
  branch: any = '';

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;

  constructor(private restService: RestService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private _i18n: I18n, private router: Router, private resumenesService: ResumenesService,) {
    super();

    var date = new Date();
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};

    this.fromDate=ngbDateStruct;
    this.untilDate=ngbDateStruct;

    console.log(   this.fromDate);
    console.log(   this.untilDate);

    this.getRegional();
    this.getUser();
    this.getFilters();

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

  getUser(){
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    console.log(this.selectedRegionalId);
    this.restService.getTechnician().then(data => {
      const resp: any = data;
      console.log(data);

      this.technician = resp.data
      Swal.close();
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

  public exportAsExcelFile(rows: any[], excelFileName: string): void {
    if (rows.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
      const workbook: XLSX.WorkBook = {Sheets: {'Compte-rendu': worksheet}, SheetNames: ['Compte-rendu']};
      console.log(workbook.Sheets);
      console.log(workbook.SheetNames);
      const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }else{
      Swal.fire({
        title:'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
      });
    }
  }
  private saveAsExcelFile(buffer: any, baseFileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, baseFileName +EXCEL_EXTENSION);
    Swal.close();
    this.dataExcel.length=0;
  }

  // private getDateFormat(date: Date): string {
  //   return formatDate(date, 'yyyyMMdd_HHmmss', 'en-US');
  // }

getFilters() {


  Swal.fire({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  Swal.showLoading();
  let params='';
  let cont=0;

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

//  var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
//  var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
 var from_date= fromD+' 00:00:00';
  var to_date=untilD+' 23:59:59';

console.log(from_date);
console.log(to_date);
console.log(this.selectedTechnician);

  params='from_date='+from_date+'&to_date='+to_date;


  if(this.selectedTechnician!=0){
    console.log('imprimir cont');
    // console.log(cont);
      params=params+'&&user_id='+this.selectedTechnician.id;

  }


  console.log('.---------->'+params);
  this.resumenesService.getPersonalMonitoring(params).then(data => {
    const resp: any = data;
    console.log('info de filter');
    console.log(data);
  // this.customers  = resp.data;
    this.rowsClient = resp.data;
    console.log(resp.error);
    let date = new Date(this.rowsClient.finish - this.rowsClient.start);
    console.log(date);
    Swal.close();
    if(resp.error){
      console.log('entro')
      Swal.fire({
        title:'Oops',
        text: 'Hubo un error en la consulta.',
        icon: 'error'
        });
    }
    // this.rowStatic =  resp.data;
    // this.rowsTemp = resp.data;
    // console.log( this.rowsClient);
  }).catch(error => {
    console.log(error);
  });

}
  saveExcel(table: any){
    console.log(table);
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    for(let value of table){
      console.log(value.users.name)
      let TableInterface:TableInterface = {
        Actividad: value.personal_activitie.description,
        Cliente: value.customer_text,
        Control: value.service_control,
        Tecnico: value.users.name,
        Fecha_Inicio: value.start,
        Fecha_Final: value.finish,
        Duracion: value.duration_activity,
      }
      this.tableExcel = TableInterface
      this.dataExcel.push(this.tableExcel);
      console.log(this.dataExcel);
    }
    this.exportAsExcelFile(this.dataExcel,'Monitoreo Personal');
  }

  // generate(){
  //   const title = 'Car Sell Report';
  //   const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
  //   const data = [
  //     [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
  //     [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
  //     [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
  //     [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
  //     [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4],
  //   ];

  //   // let workbook = new Excel.Workbook();
  //   let workbook = new Excel.Workbook();
  //   let worksheet = workbook.addWorksheet('Car Data');

  //       // Add new row
  //   let titleRow = worksheet.addRow([title]);

  //   // Set font, size and style in title row.
  //   titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };

  //   // Blank Row
  //   worksheet.addRow([]);

  //   //Add row with current date
  //   let subTitleRow = worksheet.addRow(['Date : ' + new Date()]);

  //   //Add Header Row
  //   let headerRow = worksheet.addRow(header);

  //   // Cell Style : Fill and Border
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFFFFF00' },
  //       bgColor: { argb: 'FF0000FF' }
  //     }
  //     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //   });

  //   // Add Data and Conditional Formatting
  //   data.forEach(d => {
  //     let row = worksheet.addRow(d);
  //     let qty = row.getCell(5);
  //     let color = 'FF99FF99';
  //     if (+qty.value < 500) {
  //       color = 'FF9999'
  //     }
  //     qty.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: color }
  //     }
  //   }
  //   );

  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     FileSaver.saveAs(blob, 'CarData.xlsx');
  //   });
  // }


  onDateSelectionFrom(date: any) {

    if(this.untilDate){
    var fromD = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day); //31 de diciembre de 2015
    var untilD = new Date(this.untilDate.year, this.untilDate.month, this.untilDate.day);

    console.log(this.fromDate.day);
    if(fromD> untilD){
      console.log('es mayor');
      this.untilDate=this.fromDate;
    }
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
