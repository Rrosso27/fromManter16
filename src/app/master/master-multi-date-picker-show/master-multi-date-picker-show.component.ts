import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { WorkService } from '../../master-services/Work/work.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  item?: string;
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
  selector: 'app-master-multi-date-picker-show',
  templateUrl: './master-multi-date-picker-show.component.html',
 //  styleUrls: ['./master-multi-date-picker-show.component.scss',
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
export class MasterMultiDatePickerShowComponent implements OnInit {


  hoveredDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  fromDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  toDate: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  dateInitials: Array <dateInterface> = [];
  dateInitial: any ;
  dateGeneral: any;
  _datesSelected: NgbDateStruct[] = [];
  ole = '{year: 2019, month: 10}';
  date: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  dateCurrentCancel: NgbDateStruct =  { year: 1789, month: 7, day: 14 };
  // [minDate]="{year: 2010, month: 1, day: 1}"
  // [maxDate]="{year: 2048, month: 12, day: 31}"
  dateMin: NgbDateStruct = { year: 1789, month: 7, day: 14 };
  dateMax: NgbDateStruct = { year: 1789, month: 7, day: 30 };
  dateShow: string = '';
  rowsWork: any;
  checkedList: string='1';

  routineSelecteds: Array <itemSelectInterface> = [];
  routineSelected:any ;

  _currentDateRoutines: Array <currentDateInterface> = [];
  currentDateRoutine: any;

  ngOnInit() {
  }

  @Input()
  set datesSelected(value:NgbDateStruct[])
  {
     this._datesSelected=value;
  }
  get datesSelected():NgbDateStruct[]
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

  @Output() datesSelectedChange=new EventEmitter<NgbDateStruct[]>();
  @Output() currentDateRoutinesChange=new EventEmitter<currentDateInterface[]>();


 //  currentDateRoutines: Array <currentDateInterface> = [];

  constructor(calendar: NgbCalendar, private workService:WorkService) {

  console.log('Importante data de fechas');
  console.log(this.currentDateRoutines);
  const dateDay = new Date();

  this.datesSelected=[];
  console.log('Ver rutinas')
  this.getWorks();
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
  let  dateInterface:dateInterface = {
    month : numberMonthCurrent,
    year: numberAnioCurrent
  }
  this.dateInitial =dateInterface
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
      { this.addDate(date);
        console.log('kaka2');
      }

      this.datesSelectedChange.emit(this.datesSelected);
      this.datesSelectedChange.emit(this.datesSelected);

    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.addRangeDate(this.fromDate,this.toDate);
      this.fromDate={year: 0, month: 0, day: 14};
      this.toDate={year: 0, month: 0, day: 14};;
      console.log('kaka5');
    } else {
      this.toDate = {year: 0, month: 0, day: 14};;
      this.fromDate = date;
      console.log('kaka6');
    }
  }


  getWorks() {
    Swal.fire({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.workService.getWorks().then(data => {
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
          console.log(item); // 1, "string", false
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


   getOle() {
    return '{year: 2019, month: 10}';
  }
  addDate(date: NgbDateStruct)
  {
    this.dateCurrentCancel=date;
    console.log('Seguimiento a trinis');
    console.log(this.routineSelecteds);
      let index=this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year);

      let dateComplete= Number(this.dateCurrentCancel.day+''+this.dateCurrentCancel.month+''+this.dateCurrentCancel.year);
      console.log( dateComplete);

      let cont=0;
      let itemSelect;
        for (let currentRoutine of  this.currentDateRoutines) {
          console.log(currentRoutine); // 1, "string", false
          if(currentRoutine.date == dateComplete){
            itemSelect = currentRoutine.item;
            break;
          }
          cont++;
      }

      if(itemSelect){
      console.log('información de items');
      let informationItems= itemSelect.split(',');
      let  elemento:any
      for (elemento of informationItems) {
        console.log('ingreso a mirar checks');
        this.SelectItemRoutines(elemento);
        }
      console.log(itemSelect);
    }
      if (index>=0){
       // this.datesSelected.splice(index,1);
       document.getElementById( 'routineButton')?.click();
      }      //If exist, remove the date
       else {
      //  this.datesSelected.push(date);
        document.getElementById( 'routineButton')?.click();
       }  //a simple push

    }


    addCancelDate(){
          //If exist, remove the date


          this.cleanSelectRoutines();
      document.getElementById( 'routineButtonCancel')?.click();
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

    addDateRoutine (){

      let index=this.datesSelected.findIndex(f=>f.day==this.dateCurrentCancel.day && f.month==this.dateCurrentCancel.month && f.year==this.dateCurrentCancel.year);
     // if (index>=0){
        //this.datesSelected.splice(index,1);

      //}      //If exist, remove the datedateCurrentCancel
      // else {

        for (let item of this.routineSelecteds) {
          if(item.select){
            this.checkedList = this.checkedList +','+ item.id;
          }
      }

      console.log(this.checkedList.length);

      if(this.checkedList.length>2){


      console.log("array de ids");
      this.checkedList = this.checkedList.substring(2);
       console.log( this.checkedList);

        let dateComplete:any = Number(this.dateCurrentCancel.day+''+this.dateCurrentCancel.month+''+this.dateCurrentCancel.year);
        console.log( dateComplete);
        let itemSelectInterface:itemSelectInterface = {
          date: dateComplete,
          item: this.checkedList
        }

        this.currentDateRoutine= itemSelectInterface


        this.checkedList='1';
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
        document.getElementById( 'routineButtonCancel')?.click();
       // document.getElementById( 'routineButton').click();

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
       /* Swal({
          title: 'Debes escoger por lo menos una rutina',
          text: '',
          type: 'error'
         });
        console.log('Debes escoger por lo menos una rutina');
       */
      document.getElementById( 'routineButtonCancel')?.click();
      }
      // }  //a simple push
      this.cleanSelectRoutines();
    }


    addRangeDate(fromDate:NgbDateStruct,toDate:NgbDateStruct)
    {
        //We get the getTime() of the dates from and to
        let from:any=new Date(fromDate.year+"-"+fromDate.month+"-"+fromDate.day).getTime();
        let to:any=new Date(toDate.year+"-"+toDate.month+"-"+toDate.day).getTime();
        let time:any
        for (time=from;time<=to;time+=(24*60*60*1000)) //add one day
        {
            let date:any=new Date(time);
            //javascript getMonth give 0 to January, 1, to February...
            this.addDate({year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()});
        }
        this.datesSelectedChange.emit(this.datesSelected);
        document.getElementById( 'routineButtonCancel')?.click();
    }
    //return true if is selected
    isDateSelected(date:NgbDateStruct)
    {
        return (this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year)>=0);
    }
  isHovered:any = date => (this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate));
  isInside:any = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom:any = date => equals(date, this.fromDate);
  isTo:any = date => equals(date, this.toDate);
}
