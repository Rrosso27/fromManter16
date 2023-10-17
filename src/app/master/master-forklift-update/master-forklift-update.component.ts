import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerService } from 'ngx-color-picker';
import { RestService } from '../../master-services/Rest/rest.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { UploadService } from '../../master-services/services/upload.service';
import { UUID } from 'angular2-uuid';
import { WorkService } from '../../master-services/Work/work.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
// import { View,EventSettingsModel } from "@syncfusion/ej2-angular-schedule";
// import { DatePipe } from "@angular/common";

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

interface putDateInterface {// vector seleccionado
  year: number;
  month: number;
  day: number;
}




@Injectable()
export class I18n {
  language = 'fr';
}


const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const now = new Date();

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  selector: 'app-master-forklift-update',
  templateUrl: './master-forklift-update.component.html',
  styleUrls: ['./master-forklift-update.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'],
  // providers: [I18n, { provide: NgbDatepickerI18n, useClass: MasterForkliftUpdateComponent }]
})
export abstract class MasterForkliftUpdateComponent extends NgbDatepickerI18n {

  // @Input() currentDateRoutines: Array <currentDateInterface> = [];

  datesSelected: NgbDateStruct[] = [];
  currentDateRoutines: Array<currentDateInterface> = [];

  nothingToshowText: any = 'Nothing to show'; // "By default" => There are no events scheduled that day.
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: 'delete'
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: 'edit'
    }
  ];
  events: any = [
    {
      start: new Date(),
      end: new Date(),
      title: 'title event 1',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: new Date(),
      end: new Date(),
      title: 'title event 2',
      color: this.colors.yellow,
      actions: this.actions
    }
  ]
  viewDate: Date = new Date();
  themecolor: any = '#0a5ab3'
  selectedOfficeId = 0;
  selectedBrandId:any = 0;
  selectedBusinessId:any = 0;
  selectedMachineId:any = 0;
  selectedFuelId:any = 0;
  selectedtyreId:any = 0;
  selectedModelId:any = 0;
  selectedRoutineId:any = 0;
  tooglecalendar: boolean = false;
  switchAlarm:any = true;
  switchStatus:any = true;
  own :any= false;
  currentForkId:any;
  forkliftImages: any;

  // public setView: View = 'Month';
  // public eventSettings: EventSettingsModel={

  // };
  myForm: FormGroup;
  switchCreate = true;
  switchUpdate = true;

  submitted = false;

  customers: any;
  customerOffices: any;
  brands: any;
  models: any;
  machines: any;
  tyres: any;
  fuels: any;
  public message: string= '';
  public imagePath:any = '' ;
  imgURL: any;
  imgURL1: any;
  imgURL2: any;
  selectedFiles: Array<File> = [];
  generateAlarms:any = true;
  active:any = true;
  myDate = new Date();
  s3info: any;
  forkliftRoutine: any;
  // year=parseInt(this.datePipe.transform(this.myDate,'yyyy'))+1;
  // month=parseInt(this.datePipe.transform(this.myDate,'MM'));
  // day=parseInt(this.datePipe.transform(this.myDate,'dd'));
  // public setDate:Date=new Date(this.year,this.day,this.month);
  name = 'Angular 4';
  urls:any = [];
  urlsInitial:any = [];
  contImages:any =0;
  guideImagesInitial:any = [99];

  public model: any;
  modelCustomDay: any;

  displayMonths = 1;
  navigation = 'select';


  disabled = true;
  forkliftCurrent: any;
  routines: any;



  toggle = false;
  public lastColor: string = '';
  public rgbaText: string = '';

  public color:any = '#2889e9';
  public color2:any = 'hsla(300,82%,52%)';
  public color3:any = '#fff500';
  public color4:any = 'rgb(236,64,64)';
  public color5:any = 'rgba(45,208,45,1)';

  public color13:any = 'rgba(0, 255, 0, 0.5)';
  public color14:any = 'rgb(0, 255, 255)';
  public color15:any = '#a51ad633';

  public basicColor:any = '#00215a';
  public showColorCode:any = '#db968d';
  public showColorCodeHSAL:any = 'hsl(149,27%,65%)';
  public showColorCodeRGBA:any = 'rgb(221,14,190)';
  public changeMeColor:any = '#523698';

  public arrayColors: any = {};
  public selectedColor:any = 'color';


  public date:any = { year: 0, month: 0 };

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  constructor(private _i18n: I18n, private restService: RestService, private router: Router, private uploadService: UploadService,
    public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar, public cpService: ColorPickerService, private workService: WorkService,
    private rutaActiva: ActivatedRoute, private forkliftService: ForkliftService) {

    super();
    this.currentForkId = this.rutaActiva.snapshot.paramMap.get("id");
    this.loadingData();

    const customer = new FormControl('', Validators.required);
    const office = new FormControl('', Validators.required);
    const series = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const brand = new FormControl('', Validators.required);
    const model = new FormControl('', Validators.required);
    const machine = new FormControl('', Validators.required);
    const fuel = new FormControl('', Validators.required);
    const tyre = new FormControl('', Validators.required);
    const tyreForward = new FormControl('');
    const tyreSBack = new FormControl('');
    const tonne = new FormControl('', Validators.required);
    const hoistedMast = new FormControl('', Validators.required);
    const contractedMast = new FormControl('', Validators.required);
    const startTime = new FormControl('');
    const currentTime = new FormControl('');
    const routine = new FormControl('', Validators.required);
    const observation = new FormControl('');

    this.myForm = new FormGroup({
      customer: customer,
      office: office,
      series: series,
      description: description,
      brand: brand,
      model: model,
      machine: machine,
      fuel: fuel,
      tyre: tyre,
      tyreForward: tyreForward,
      tyreSBack: tyreSBack,
      tonne: tonne,
      hoistedMast: hoistedMast,
      contractedMast: contractedMast,
      startTime: startTime,
      currentTime: currentTime,
      routine: routine,
      observation: observation
    });

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

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  eventClicked(event:any) {
    console.log(event);
  }
  actionClicked(event:any) {
    console.log('action', event.action)
    console.log('event', event.event)
  }

  sendBrand() {
    this.submitted = true;
  }


  onChangeGenerateAlarms(check: any) {
    this.generateAlarms = check;
    console.log(check);
  }

  onChangeActive(check: any) {
    this.active = check;
    console.log(check);
  }

  loadingData() {
    Swal.fire({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.restService.getCustomer().then(data => {
      const resp: any = data;
      console.log(data);
      this.customers = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });

    this.restService.getBrands().then(data => {
      const resp: any = data;
      console.log(data);
      this.brands = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });

    this.restService.getMachines().then(data => {
      const resp: any = data;
      console.log(data);
      this.machines = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });


    this.restService.getFuels().then(data => {
      const resp: any = data;
      console.log(data);
      this.fuels = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });

    this.restService.getTyres().then(data => {
      const resp: any = data;
      console.log(data);
      this.tyres = resp.data;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });

    this.forkliftService.getForklift(Number(this.currentForkId)).then(data => {
      const resp: any = data;
      this.forkliftCurrent = data;
      this.forkliftCurrent = this.forkliftCurrent.data;
      this.initialForklift();
      console.log('información');
      console.log(data);
      Swal.close();
    }).catch(error => {
      console.log(error);
    });



  }


  initialForklift() {

    this.selectedBrandId = Number(this.forkliftCurrent.brand_id);
    this.selectedBusinessId = Number(this.forkliftCurrent.customer_id);
    this.selectedMachineId = Number(this.forkliftCurrent.machine_id);
    this.getCustomerOffice();
    this.getCustomerModel();
    this.selectedOfficeId = Number(this.forkliftCurrent.branch_offices_id);
    this.selectedModelId = Number(this.forkliftCurrent.model_id);
    this.selectedFuelId = Number(this.forkliftCurrent.fuel_id);
    this.selectedtyreId = Number(this.forkliftCurrent.tyre_id);
    this.selectedRoutineId = Number(this.forkliftCurrent.routine_id);

    this.myForm.get('series')?.setValue(this.forkliftCurrent.serie);
    this.myForm.get('description')?.setValue(this.forkliftCurrent.description);
    this.myForm.get('tyreForward')?.setValue(this.forkliftCurrent.tyre_forward);
    this.myForm.get('tyreSBack')?.setValue(this.forkliftCurrent.tyre_sback);
    this.myForm.get('tonne')?.setValue(this.forkliftCurrent.tonne);
    this.myForm.get('hoistedMast')?.setValue(this.forkliftCurrent.mastil_izado);
    this.myForm.get('contractedMast')?.setValue(this.forkliftCurrent.mastil_contract);
    this.myForm.get('startTime')?.setValue(this.forkliftCurrent.h_initial);
    this.myForm.get('currentTime')?.setValue(this.forkliftCurrent.h_current);
    this.myForm.get('observation')?.setValue(this.forkliftCurrent.observation);

    if (Number(this.forkliftCurrent.status) !== 0) {
      this.switchStatus = false;
    }

    if (Number(this.forkliftCurrent.alarm) !== 0) {
      this.switchAlarm = false;
    }

    if (Number(this.forkliftCurrent.status_own) == 1) {
      this.own = true;
    }

    this.forkliftService.getForkliftImage(Number(this.currentForkId)).then(data => {
      const resp: any = data;
      this.forkliftImages = data;
      this.forkliftImages = this.forkliftImages.data;
      let i = 0;
      console.log('nombres de imagenes');
      let forkliftImage:any
      for ( forkliftImage of this.forkliftImages) {
        console.log(forkliftImage.name);
        console.log('Jajajajaja');
        this.urls.push(forkliftImage.name);
        this.urlsInitial.push(forkliftImage.name);
        this.guideImagesInitial.push(i);// guia para saber que imagenes estan en amazon
        i = i + 1;
      }
      this.contImages = this.urls.length;
      console.log('información  fffffffff');
      console.log(data);
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


  getCustomerOffice() {
    console.log(this.selectedBusinessId);
    this.restService.getCustomerOffice(this.selectedBusinessId).then(data => {
      const resp: any = data;
      console.log('ole ole');
      console.log(resp);
      this.customerOffices = resp.data_branchoffices;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });

  }
  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }

  getCustomerModel() {
    console.log(this.selectedBusinessId);
    this.restService.getBrandModels(this.selectedBrandId).then(data => {
      const resp: any = data;
      console.log(data);
      this.models = resp.data_models;
      Swal.close();
    }).catch(error => {
      console.log(error);
    });
  }


  preview(files:any) {
    console.log(files);
    if (files.length === 0) {
      return console.log('jaja');
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  /*upload() {
   const file = this.selectedFiles.item(0);
   const uuid = UUID.UUID();
   console.log(uuid);
   console.log(file.name + '' + file.type);
   const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
   console.log(extension);
   this.uploadService.uploadFile(file);
  }*/


  selectFile(event:any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }


  sendUpdateForklift() {
    console.log('Ole ole ole');


    // "Cannot add or update a child row: a foreign key constraint fails
    // (`witupco_master`.`forklift`, CONSTRAINT `fk_fork_lift_model_id` FOREIGN KEY
    //  (`model_id`) REFERENCES `fuel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION)"


    console.log();

    if (Number(this.selectedOfficeId) !== 0 && Number(this.selectedBrandId) !== 0
      && Number(this.selectedBusinessId) !== 0 && Number(this.selectedMachineId) !== 0
      && Number(this.selectedModelId) !== 0 && Number(this.selectedModelId) !== 0
      && Number(this.selectedFuelId) !== 0 && Number(this.selectedtyreId) !== 0) {
      console.log('Ole ole ole');
      this.submitted = true;
      console.log(this.myForm.invalid);
      if (!this.myForm.invalid) {
        Swal.fire({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let generateAlarmTemp = 0;

        console.log(this.switchUpdate);
        if (this.switchUpdate === true) {
          generateAlarmTemp = 0;
        } else {
          generateAlarmTemp = 1;
        }

        let activeTemp = 0;
        console.log(this.switchUpdate);
        if (this.switchUpdate === true) {
          activeTemp = 0;
        } else {
          activeTemp = 1;
        }

        console.log(this.myForm.get('series')?.value + ',' +
          this.selectedBusinessId + ',' + this.selectedOfficeId + ',' + this.myForm.get('description')?.value.toUpperCase() + ',' +
          this.selectedBrandId + ',' + 0 + ',' + this.selectedModelId + ',' + this.selectedMachineId + ',' + this.selectedtyreId + ',' +
          this.selectedFuelId);

        /*serie: string,
            customer_id: number,
            branch_offices_id: number,
            description: string,
            status: number,
            brand_id: number,
            model_id: number,
            machine_id: number,
            tyre_id: number,
            tyreForward: number,
            tyreSBack: number,
            fuel_id: number,
            routine_id: number,
            tonne: number,
            mastil_izado: number,
            mastil_contract: number,
            h_initial: number,
            h_current: number,
            alarm: number,
            observation: string*/

        let status = 0;
        let alarm = 0;

        if (this.switchAlarm === false) {
          alarm = 1;
        }

        if (this.switchStatus === false) {
          status = 1;
        }

        let statusOwn = 0; // 0 = no es propio, 1 = es propio
        console.log('No ingreso a la pagina');
        if (this.own === true) {
          console.log('ingreso a la pagina');
          statusOwn = 1;
        }

        console.log('valor status own');
        console.log(statusOwn);


        this.restService.updateforklift(this.currentForkId, this.myForm.get('series')?.value,
          this.selectedBusinessId, this.selectedOfficeId, this.myForm.get('description')?.value.toUpperCase(), status,
          this.selectedBrandId, this.selectedModelId, this.selectedMachineId, this.selectedtyreId, this.myForm.get('tyreForward')?.value,
          this.myForm.get('tyreSBack')?.value, this.selectedFuelId, this.selectedRoutineId, this.myForm.get('tonne')?.value, this.myForm.get('hoistedMast')?.value,
          this.myForm.get('contractedMast')?.value, this.myForm.get('startTime')?.value, this.myForm.get('currentTime')?.value, alarm, this.myForm.get('observation')?.value,localStorage.getItem('userid'), statusOwn)
          .then(data => {
            const resp: any = data;
            console.log('Informacion de montacarga');
            console.log(resp);

            if (resp.success === false) {
              Swal.fire({
                title: 'Este tercero ya esta registrado',
                text: 'Este tercero no se puede registrar',
                icon: 'error'
              });
            } else {
              console.log('id montacarga ' + resp.data.id);
              // En este caso se manda guardar las imagenes y rutinas


              if (this.urls.length > 0) {
                this.deleteAllImagesForlift(this.currentForkId); //Borrar imagenes y poner las nuevas
                this.upload(this.currentForkId);
              } else {
                this.deleteAllImagesForlift(this.currentForkId); //Borrar imagenes
              }

              Swal.fire({
                title: 'Equipo actualizado',
                icon: 'success'
              });
              this.router.navigateByUrl('/master/forkliftShow');
              //YCV 29-11-21
            }
          }).catch(error => {
            console.log(error);
          });
      }
    } else {
      console.log('Ole ole ole');
      Swal.fire({
        title: 'Debe seleccionar todos los campos obligatorios',
        text: 'Debe seleccionar todos los campos obligatorios',
        icon: 'error'
      });
    }
  }

  onChangeAlarm(check: any) {
    this.switchAlarm = check;
    console.log(check);
  }

  onChangeStatus(check: any) {
    this.switchStatus = check;
    console.log(check);
  }

  onChangeOwn(check: any) {
    this.own = check;
    console.log('este es el resultado propio');
    console.log(check);
  }




  onSelectFile(event:any) {


    var filesAmount = event.target.files.length;

    this.selectedFiles.push(event.target.files);
    console.log(this.selectedFiles[0]);
    var filename = event.target.files[event.target.files.length - 1].name;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log(allowedExtensions.exec(filename));
    var extFilename = filename.split('.').pop();

    if (extFilename === 'jpg' || extFilename === 'jpeg' || extFilename === 'png') {

      console.log(filename);
      console.log(this.urls);
      console.log(filesAmount);
      if (this.urls.length <= 2) {
        if (event.target.files && event.target.files[0]) {
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              console.log(event.target.result);
              this.urls.push(event.target.result);

            }
            reader.readAsDataURL(event.target.files[i]);
          }
        }
      } else {
        this.selectedFiles.splice(this.selectedFiles.length - 1, 1);
        Swal.fire({
          title: 'El numero maximo de imagenes son 3',
          text: 'No se pueden cargar mas de 3 imagenes',
          icon: 'error'
        });
      }
    } {
      console.log('oleoleole error');
    }


  }

  ngOnInit() {
  }


  deleteAllImagesForlift(idForklift: number) {

    this.forkliftService.deleteImagesForklift(idForklift).then(data => {
      const resp: any = data;
      console.log(data);
      // Swal.close();
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }

  deleteImage(i: number) {
    console.log('resultado sin borrar: ' + this.guideImagesInitial);
    this.urls.splice(i, 1);
    this.urlsInitial.splice(i, 1);

    if (this.selectedFiles.length > 0) {
      let ind = this.urls.length;
      this.selectedFiles.splice(ind - 1, 1);
    }


    for (let j = 0; j < this.guideImagesInitial.length; j++) {
      if (this.guideImagesInitial[j] === i) {
        this.guideImagesInitial.splice(j, 1);
        // this.urls.splice(j,1);
      }
    }
    console.log('resultado: ' + this.guideImagesInitial);
  }

  test() {
    this.upload(this.currentForkId)
  }


  upload(idForklift: number) {

    let i = 0;
    console.log('dddddddddddd');
    console.log(this.selectedFiles);
    console.log('longitud de archivos: ' + this.selectedFiles.length);
    let file:any
    for ( file of this.selectedFiles) {

      console.log('Importante valores de busqueda: ' + this.guideImagesInitial);

      let result = this.guideImagesInitial.indexOf(i);
      console.log('Resultado de busqueda: ' + result);

      // if(result===-1){

      console.log('longitud de archivos: ' + this.selectedFiles.length);
      const fileole = file[0];//[i];
      console.log(fileole);
      const uuid = UUID.UUID();
      console.log(uuid);
      console.log(fileole.name + '' + fileole.type);
      const extension = (fileole.name.substring(fileole.name.lastIndexOf('.'))).toLowerCase();
      console.log(extension);
      this.uploadService.uploadFileForkliftUpdate(fileole, idForklift).then(res => {
        console.log('s3info' + JSON.stringify(res));
        this.s3info = res;
        console.log(this.s3info);
        //this.insertNew();
      }).catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'oops a currido un error',
          text: 'se ha presentado un error al subir la imagen',
          allowOutsideClick: false
        });
      });
      // }
      /*else{
        //Solo agregar en base de datos, por que borramos todo
        console.log('imagenes para insertar');
        console.log(this.urls[i]);
         let nameFileFinal='https://masterforklift.s3.amazonaws.com/'+ this.urls[i];
             this.workService.storeImageForklift(idForklift,  nameFileFinal).then(data => {
                  const resp: any = data;
                  console.log(data);
                 // Swal.close();
                  console.log(resp);
                }).catch(error => {
                  console.log(error);
                });
      }*/
      i = i + 1;

    }

    //If(this.selectedFiles.length<=0){
    // Solo va guardar las iniciales que se mantengan
    for (let url of this.urlsInitial) {

      this.workService.storeImageForklift(idForklift, url).then(data => {
        const resp: any = data;
        console.log(data);
        // Swal.close();
        console.log(resp);
      }).catch(error => {
        console.log(error);
      });
    }
    // }*/


  }


  goAdminForklifts() {
    this.router.navigateByUrl('master/forkliftShow');
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', null);
  }


  get checkForm() { return this.myForm.controls; }
}
