import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { WorkService } from '../../master-services/Work/work.service';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ChecklistService } from '../../master-services/checklist/checklist.service';


interface dateInterface {
  year?: number;
  month?: number;
}

interface itemSelectInterface {// item para mostrar selccionados
  id?: number;
  item?: string;
  select?: boolean;
}

interface currentDateInterface {// vector seleccionado
  date?: number;
  dateText?: string;
  preventive?: string;
  corrective?: string;
  checklist?: string;
  technician?: string;
}

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-master-multi-date-picker',
  templateUrl: './master-multi-date-picker.component.html',
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: blue;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }
  .custom-day.selected{  
    background-color: rgba(255, 255, 0, .5);
  }

  .input-group {
    &.datepicker-right {
        ngb-datepicker {
            left: inherit !important;
            right: 0px;
        }
    }
}

`]
})
export class MasterMultiDatePickerComponent implements OnInit {



  hoveredDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 } ;
  fromDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  toDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  dateInitials: Array <dateInterface> = [];
  dateInitial:any ;


  
  dateGeneral: any;
  _datesSelected: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  ole = '{year: 2019, month: 10}';
  date: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  dateCurrentCancel: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  // [minDate]="{year: 2010, month: 1, day: 1}"
  // [maxDate]="{year: 2048, month: 12, day: 31}"
  dateMin: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  dateMax: NgbDateStruct = { year: 1789, month: 7, day: 30 };
  dateShow: string = '';
  rowsWork: any;
  preventiveList: string='';
  correctiveList: string='';
  checkedList: string='';
  technicianList: string='';

  routineSelecteds: Array <itemSelectInterface> = [];
  routineSelected: any;

 //  routineCorrectives: Array <itemSelectInterface> = [];
 //  routineCorrective: itemSelectInterface;

  checklisSelecteds: Array <itemSelectInterface> = [];
  checklistSelected:any ;

  technicianSelecteds: Array <itemSelectInterface> = [];
  technicianSelected: any;
 
  _currentDateRoutines: Array <currentDateInterface> = [];
  currentDateRoutine: any;

  preventive: boolean = false;
  corrective: boolean = false;
  checklist: boolean = false;

  correctives: any;
  preventives: any;
  checklists: any;
  technician: any;
  _test: string='';
  routines: any
  
  ngOnInit() {
  }

  @Input()
  set datesSelected(value:NgbDateStruct)  
  {
     this._datesSelected=value;
  }
  get datesSelected():NgbDateStruct
  {
    return this._datesSelected?this._datesSelected:[];
  }

  @Input()
  set currentDateRoutines(value:currentDateInterface[])  
  {
     this._currentDateRoutines=value;
  }
  get currentDateRoutines():currentDateInterface[]
  {
    return this._currentDateRoutines?this._currentDateRoutines:[];
  }

  @Input()
  set test(value:string)  
  {
     this._test=value;
  }
  get test():string
  {
    return this._test;
  }

  @Input()
  set forklift(value:any)  
  {
     this.routines=value;
  }
  get forklift():any
  {
    return this.routines;
  }

  @Output() datesSelectedChange=new EventEmitter<NgbDateStruct[]>();
  @Output() currentDateRoutinesChange=new EventEmitter<currentDateInterface[]>();
  @Output() testChange = new EventEmitter<string>();


 //  currentDateRoutines: Array <currentDateInterface> = [];

  constructor(calendar: NgbCalendar, private workService:WorkService, private restService: RestService,
    private checklistService: ChecklistService) {

  console.log('Importante data de fechas');
  console.log(this.currentDateRoutines);
  console.log(this._currentDateRoutines);
  console.log(this._datesSelected);
  console.log('id maquina');
  console.log(this.routines);
  const dateDay = new Date();
  
  this.datesSelected=[];
  console.log('Ver rutinas')
  this.getTechnician();
  let numberMonthCurrent = dateDay.getMonth() + 1;
  let numberAnioCurrent = dateDay.getFullYear();


  for ( let _i = 0; _i < 13; _i++) {

if (_i !== 0 ) {
  if (numberMonthCurrent === 12) {
    numberMonthCurrent = 1;
     numberMonthCurrent = numberMonthCurrent ;
     numberAnioCurrent = numberAnioCurrent + 1;
  } else {
     numberMonthCurrent = numberMonthCurrent + 1;
  }

}
if (numberMonthCurrent !== 13) {
  this.dateInitial = {
    month : numberMonthCurrent,
    year: numberAnioCurrent
   };
}
  this.dateInitials.push(this.dateInitial);
  console.log(this.dateInitials);
}




  console.log(JSON.stringify(this.dateInitials));
  }

  onDateSelection(event:any,date: NgbDateStruct) {
    console.log(date);
    this.dateShow = 'Fecha seleccionada  '+date.day+'/'+date.month+'/'+date.year;
    console.log(this.dateShow);
    // document.getElementById( 'routineButton').click();
    event.target.parentElement.blur();  //make that not appear the outline
    if (!this.fromDate && !this.toDate) {
      if (event.ctrlKey==true)  //If is CrtlKey pressed
      {  this.fromDate = date;
          console.log('kaka1');
      } 
      else
      console.log('antes de entrar add date');
      { this.addDate(date);
      }

      this.datesSelectedChange.emit(this.datesSelected);

    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.addRangeDate(this.fromDate,this.toDate);
      this.fromDate=null;
      this.toDate=null;
      console.log('kaka5');
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log('kaka6');
    }
  }

  selectItem(event: any){
    console.log(event);
    console.log(event.target.checked);

    if(event.target.value == 0){

      if(event.target.checked == true ){
        this.preventive = true;
        this.getWorks();
      }else{
        this.preventive = false;
      }
    }

    if(event.target.value == 1){

      if(event.target.checked == true ){
        this.corrective = true;
        this.getCorretive();
      }else{
        this.corrective = false;
      }
    }

    if(event.target.value == 2){

      if(event.target.checked == true ){
        this.checklist = true;
        this.getChecklist();
      }else{
        this.checklist = false;
      }
    }
  }

  getCorretive(){

  }

  getChecklist(){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.checklistService.showChecklist().then(data => {
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
        this.checklists = resp.data;
        for (let item of  this.checklists) {
          console.log(item); // 1, "string", false
          let itemSelectInterface :itemSelectInterface = {
            id: item.id,
            item: item.description,
            select: false
          }

          this.checklistSelected= itemSelectInterface
          this.checklisSelecteds.push(this.checklistSelected);
      }

      console.log("ole ole");
      console.log(this.checklisSelecteds);


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

  getWorks() {
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.workService.getWorks().then(data => {
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
          console.log(item); // 1, "string", false
          let itemSelectInterface: itemSelectInterface = {
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
      swal.close();
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }

  getTechnician(){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.restService.getTechnician().then(data => {
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
        for (let item of  this.technician) {
          console.log(item); // 1, "string", false
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
      swal.close();
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }


   getOle() {
    return '{year: 2019, month: 10}';
  }
  addDate(date: NgbDateStruct)
  {
    console.log('entro add date');
    this.dateCurrentCancel=date;
    console.log('Seguimiento a trinis');
   //  console.log(this.routineSelecteds);
      let index=this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year);

      let dateComplete= Number(this.dateCurrentCancel.day+''+this.dateCurrentCancel.month+''+this.dateCurrentCancel.year);
      console.log( dateComplete);
     
      let cont=0;
      let itemSelect;
        for (let currentRoutine of  this.currentDateRoutines) {
          console.log(currentRoutine); // 1, "string", false
          if(currentRoutine.date == dateComplete){
            itemSelect = currentRoutine.preventive;
            break;
          }
          cont++;
      }

      if(itemSelect){
      console.log('información de items');
      let informationItems= itemSelect.split(',');
      for (let elemento of informationItems) {
        console.log('ingreso a mirar checks');
        this.SelectItemRoutines(elemento);
        }
      console.log(itemSelect);
    }
      if (index>=0){
       // this.datesSelected.splice(index,1);
       document.getElementById( 'routineButton').click();
      }      //If exist, remove the date
       else {
      //  this.datesSelected.push(date);
        document.getElementById( 'routineButton').click();
       }  //a simple push
        
    }

    addRoutinePreventive(idPreventive: number){
      console.log('jajaja');
      console.log(this.routineSelecteds);
      this.routineSelecteds.map(function(dato){
        if(dato.id == idPreventive){
         //dato.select = true;
         console.log('ingreso');
      }   
        return dato;
      });
    }

    addRoutineChecklist(idChecklist: number){
      console.log('jajaja');
      console.log(this.checklisSelecteds);
      this.checklisSelecteds.map(function(dato){
        if(dato.id == idChecklist){
         dato.select = true;
         console.log('ingreso');
      }   
        return dato;
      });
    }



    addCancelDate(){
          //If exist, remove the date
          
          
          this.cleanSelectRoutines();
      document.getElementById( 'routineButtonCancel').click();
    }

    cleanSelectRoutines(){
      this.routineSelecteds.map(function(dato){
        //if(dato.Modelo == modelo){
          dato.select = false;
        //}
        
        return dato;
      });
    }

    SelectItemRoutines(idItem: number){// Falta organizarlo
      this.routineSelecteds.map(function(dato){

        console.log(dato.id+'ole'+idItem);
        if(Number(dato.id) === Number(idItem)){
          dato.select = true;
          console.log('hacer cambio');
        }
        
        return dato;
      });
    }
    
    SelectItemTechnician(idTechnician: number){// Falta organizarlo
      console.log('jajaja');
      console.log(this.technicianSelecteds);
      this.technicianSelecteds.map(function(dato){
        if(dato.id == idTechnician){
         dato.select = true;
         console.log('ingreso');
      }   
        return dato;
      });
    }

    addDateRoutine (){
   
      let index=this.datesSelected.findIndex(f=>f.day==this.dateCurrentCancel.day && f.month==this.dateCurrentCancel.month && f.year==this.dateCurrentCancel.year);
     // if (index>=0){
        //this.datesSelected.splice(index,1);
      
      //}      //If exist, remove the datedateCurrentCancel
      // else {
       if(this.preventive==true){
         console.log('entro');
         console.log(this.routineSelecteds);
         for (let item of this.routineSelecteds) {
           console.log('entro');
           if(item.select){
            console.log(item);
            console.log('entro');
             this.preventiveList = this.preventiveList + item.id +',';
             console.log('entro');
            }
          }
       }

      //  if(this.corrective==true){
      //   for (let item of this.routineSelecteds) {
      //     if(item.select){
      //       this.correctiveList = this.correctiveList + item.id +',';
      //     }
      //   }
      // }
      
      // if(this.checklist==true){
      //   for (let item of this.checklisSelecteds) {
      //     if(item.select){
      //       this.checkedList = this.checkedList + item.id +',';
      //     }
      // }
      console.log(this.technicianSelecteds);
      for (let item of this.technicianSelecteds) {
        console.log('entro');
        if(item.select){
          console.log(item);
          console.log('entro');
            this.technicianList = this.technicianList + item.id +',';
          }
        }
  
        

    console.log(this.preventiveList.length);
    console.log(this.preventiveList);
    console.log(this.correctiveList.length);
      console.log(this.checkedList.length);
      console.log(this.technicianList);

      if(this.checkedList.length>2 || this.preventiveList.length>2){   

   
      console.log("array de ids");
      this.checkedList = this.checkedList.substring(2);
       console.log( this.checkedList);

        let dateComplete= Number(this.dateCurrentCancel.day+''+this.dateCurrentCancel.month+''+this.dateCurrentCancel.year);
        let dateText = this.dateCurrentCancel.day+'-'+this.dateCurrentCancel.month+'-'+this.dateCurrentCancel.year
        console.log( dateComplete);

        let currentDateInterface:currentDateInterface = {
          date: dateComplete,
          dateText: dateText,
          preventive: this.preventiveList,
          corrective: this.correctiveList,
          checklist: this.checkedList,
          technician: this.technicianList
        }
        this.currentDateRoutine=currentDateInterface

console.log(this.currentDateRoutine);
        this.preventiveList='';
        this.correctiveList='';
        this.checkedList='';
        this.technicianList='';
        console.log('importante');
        console.log(  this.currentDateRoutines);

        let finDate = 0;
        let cont=0;
        for (let currentRoutine of  this.currentDateRoutines) {
          console.log(currentRoutine.date+' Validando'+ dateComplete); // 1, "string", false
          if(currentRoutine.date == dateComplete){
            finDate=1;
            break;
          }
          cont++;
      }

        console.log('Esta es la posición en el arreglo: ' + cont);
        console.log( this.currentDateRoutines.length);
        console.log(cont);
        console.log( this.currentDateRoutines.length-1+'Sran iguales' +cont);
      if(finDate==1){
        console.log('entro');
        this.currentDateRoutines.splice(cont, 1);
        this.datesSelected.splice(cont, 1);
      }
        this.currentDateRoutines.push(this.currentDateRoutine);
        console.log('vector para insertar');
        console.log(this.currentDateRoutines);
        this.datesSelected.push(this.dateCurrentCancel);
        document.getElementById( 'routineButtonCancel').click();
       // document.getElementById( 'routineButton').click();
       console.log(this.currentDateRoutines);
       this.testChange.emit('hola');
       this.currentDateRoutinesChange.emit(this.currentDateRoutines);
      }else{

        let index=this.datesSelected.findIndex(f=>f.day== this.dateCurrentCancel.day && f.month== this.dateCurrentCancel.month && f.year== this.dateCurrentCancel.year);
        console.log('importante');
        console.log(index);
        console.log(index);
        if (index>=0){
        this.datesSelected.splice(index,1);
      }  


      ///
        let dateComplete= Number(this.dateCurrentCancel.day+''+this.dateCurrentCancel.month+''+this.dateCurrentCancel.year);
      let cont=0;
      let finDate=0;
      for (let currentRoutine of  this.currentDateRoutines) {
        console.log(currentRoutine); // 1, "string", false
        if(currentRoutine.date == dateComplete){
          finDate=1;
          break;
        }
        cont++;
    }

      console.log('Esta es la posición en el arreglo: ' + cont);
      console.log( this.currentDateRoutines.length);
      console.log(cont);
    if( finDate==1){
      console.log('entro');
      this.currentDateRoutines.splice(cont, 1);
      console.log('borro');
    }
///
       /* swal({
          title: 'Debes escoger por lo menos una rutina',
          text: '',
          type: 'error'
         });
        console.log('Debes escoger por lo menos una rutina');
       */
      console.log(this.currentDateRoutine);
      console.log(this.currentDateRoutines);
      document.getElementById( 'routineButtonCancel').click();
      }
      // }  //a simple push
      this.cleanSelectRoutines();
    }


    addRangeDate(fromDate:NgbDateStruct,toDate:NgbDateStruct)
    {
        //We get the getTime() of the dates from and to
        let from=new Date(fromDate.year+"-"+fromDate.month+"-"+fromDate.day).getTime();
        let to=new Date(toDate.year+"-"+toDate.month+"-"+toDate.day).getTime();
        for (let time=from;time<=to;time+=(24*60*60*1000)) //add one day
        {
            let date=new Date(time);
            //javascript getMonth give 0 to January, 1, to February...
            console.log('antes de entrar add date');
            
            this.addDate({year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()});
        }   
        this.datesSelectedChange.emit(this.datesSelected);
        document.getElementById( 'routineButtonCancel').click();
    }
    //return true if is selected
    isDateSelected(date:NgbDateStruct)
    {
        return (this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year)>=0);
    }
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

 
}
