import { Component, OnInit, Injectable, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { ColorPickerService } from "ngx-color-picker";
import { RestService } from "../../master-services/Rest/rest.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from "@angular/router";
import { UploadService } from "../../master-services/services/upload.service";
import { UUID } from "angular2-uuid";
import { WorkService } from "../../master-services/Work/work.service";
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


interface itemSelectInterface {
  // item para mostrar selccionados
  id?: number;
  item?: string;
  select?: boolean;
}

interface currentDateInterface {
  // vector seleccionado
  date?: number;
  dateText?: string;
  preventive?: string;
  corrective?: string;
  checklist?: string;
  technician?: string;
}

@Injectable()
export class I18n {
  language = "fr";
}

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

const now = new Date();

export class Cmyk {
  constructor(
    public c: number,
    public m: number,
    public y: number,
    public k: number
  ) {}
}

@Component({
  selector: "app-master-forklift",
  templateUrl: "./master-forklift.component.html",
  styleUrls: [
    "./master-forklift.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
  // providers: [
  //   I18n,
  //   { provide: NgbDatepickerI18n, useClass: MasterForkliftComponent },
  // ],
})
export abstract class MasterForkliftComponent extends NgbDatepickerI18n {
  // @Input() currentDateRoutines: Array <currentDateInterface> = [];

  test: string= "";
  datesSelected: NgbDateStruct[] = [];
  currentDateRoutines: Array<currentDateInterface> = [];
  nothingToshowText: any = "Nothing to show"; // "By default" => There are no events scheduled that day.
  colors: any = {
    red: {
      primary: "#ad2121",
      secondary: "#FAE3E3",
    },
    yellow: {
      primary: "#e3bc08",
      secondary: "#FDF1BA",
    },
  };
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: "delete",
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: "edit",
    },
  ];
  events: any = [
    {
      start: new Date(),
      end: new Date(),
      title: "title event 1",
      color: this.colors.red,
      actions: this.actions,
    },
    {
      start: new Date(),
      end: new Date(),
      title: "title event 2",
      color: this.colors.yellow,
      actions: this.actions,
    },
  ];
  viewDate: Date = new Date();
  themecolor: any = "#0a5ab3";
  selectedOfficeId = 0;
  selectedBrandId = 0;
  selectedBusinessId = 0;
  selectedMachineId = 0;
  selectedMachineIdif = 0;

  selectedFuelId = 0;
  selectedtyreId = 0;
  selectedModelId = 0;
  selectedRoutineId = 0;
  tooglecalendar: boolean = false;
  filesImageForlift:any;
  switchAlarm = true;
  switchStatus = true;
  own = false;

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
  public message: string = '';
  public imagePath:any ;
  imgURL: any;
  imgURL1: any;
  imgURL2: any;
  selectedFiles: Array<File> = [];
  generateAlarms:any = true;
  active:any = true;
  myDate = new Date();
  s3info: any;
  // year=parseInt(this.datePipe.transform(this.myDate,'yyyy'))+1;
  // month=parseInt(this.datePipe.transform(this.myDate,'MM'));
  // day=parseInt(this.datePipe.transform(this.myDate,'dd'));
  // public setDate:Date=new Date(this.year,this.day,this.month);
  name = "Angular 4";
  urls = [];

  public model: any;
  modelCustomDay: any;

  displayMonths = 1;
  navigation = "select";

  hoveredDate:NgbDateStruct[] = [];
  fromDate: NgbDateStruct[ ]=[];
  toDate: NgbDateStruct[]= [];

  disabled = true;

  toggle = false;
  public lastColor: string = '';
  public rgbaText: string = '';

  public color = "#2889e9";
  public color2 = "hsla(300,82%,52%)";
  public color3 = "#fff500";
  public color4 = "rgb(236,64,64)";
  public color5 = "rgba(45,208,45,1)";

  public color13 = "rgba(0, 255, 0, 0.5)";
  public color14 = "rgb(0, 255, 255)";
  public color15 = "#a51ad633";

  public basicColor = "#00215a";
  public showColorCode = "#db968d";
  public showColorCodeHSAL = "hsl(149,27%,65%)";
  public showColorCodeRGBA = "rgb(221,14,190)";
  public changeMeColor = "#523698";

  public arrayColors: any = {};
  public selectedColor = "color";

  modelPopup: NgbDateStruct[]= [];
  public date:any = { year:0 , month:0 };

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };

  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  maquina() {
    const data = this.selectedMachineId;
    if (data == 4) {
      this.selectedMachineIdif = 0;
    } else {
      this.selectedMachineIdif = 1;
    }
  }

  constructor(
    private _i18n: I18n,
    private restService: RestService,
    private router: Router,
    private uploadService: UploadService,
    public parserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar,
    public cpService: ColorPickerService,
    private workService: WorkService
  ) {
    super();
    this.loadingData();

    const customer = new FormControl("", Validators.required);
    const office = new FormControl("", Validators.required);
    const series = new FormControl("", Validators.required);
    const description = new FormControl("", Validators.required);
    const brand = new FormControl("", Validators.required);
    const model = new FormControl("", Validators.required);
    const machine = new FormControl("", Validators.required);
    const fuel = new FormControl("", Validators.required);
    const tyre = new FormControl("", Validators.required);
    const tyreForward = new FormControl("");
    const tyreSBack = new FormControl("");
    const tonne = new FormControl("", Validators.required);
    const hoistedMast = new FormControl("");
    const contractedMast = new FormControl("");
    const startTime = new FormControl("");
    const currentTime = new FormControl("");
    const routine = new FormControl("", Validators.required);
    const observation = new FormControl("");

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
      observation: observation,
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



  sendBrand() {
    this.submitted = true;
  }

  onChangeGenerateAlarms(check: any) {
    this.generateAlarms = check;
  }

  onChangeActive(check: any) {
    this.active = check;
  }

  loadingData() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restService
      .getCustomer()
      .then((data) => {
        const resp: any = data;
        this.customers = resp.data;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });

    this.restService
      .getBrands()
      .then((data) => {
        const resp: any = data;
        this.brands = resp.data;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });

    this.restService
      .getMachines()
      .then((data) => {
        const resp: any = data;
        this.machines = resp.data;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });

    this.restService
      .getFuels()
      .then((data) => {
        const resp: any = data;
        this.fuels = resp.data;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });

    this.restService
      .getTyres()
      .then((data) => {
        const resp: any = data;
        this.tyres = resp.data;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomerOffice() {
    this.restService
      .getCustomerOffice(this.selectedBusinessId)
      .then((data) => {
        const resp: any = data;
        this.customerOffices = resp.data_branchoffices;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }
  change2(value: any) {
    this.test = value;
  }

  change3(value: any) {
    this.currentDateRoutines = value;
  }

  getCustomerModel() {
    this.restService
      .getBrandModels(this.selectedBrandId)
      .then((data) => {
        const resp: any = data;
        this.models = resp.data_models;
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  preview(files:any) {
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  sendForklift() {
    if (
      Number(this.selectedOfficeId) !== 0 &&
      Number(this.selectedBrandId) !== 0 &&
      Number(this.selectedBusinessId) !== 0 &&
      Number(this.selectedMachineId) !== 0 &&
      Number(this.selectedModelId) !== 0 &&
      Number(this.selectedModelId) !== 0 &&
      Number(this.selectedFuelId) !== 0 &&
      Number(this.selectedtyreId) !== 0
    ) {
      this.submitted = true;
      if (!this.myForm.invalid) {
        Swal.fire({
          title: "Validando información ...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let generateAlarmTemp = 0;
        if (this.switchUpdate === true) {
          generateAlarmTemp = 0;
        } else {
          generateAlarmTemp = 1;
        }

        let activeTemp = 0;
        if (this.switchUpdate === true) {
          activeTemp = 0;
        } else {
          activeTemp = 1;
        }

        let status = 0;
        let alarm = 0;
        let statusOwn = 0; // 0 = no es propio, 1 = es propio

        if (this.switchAlarm === false) {
          alarm = 1;
        }

        if (this.switchStatus === false) {
          status = 1;
        }

        if (this.own === true) {
          statusOwn = 1;
        }

        this.restService
          .createforklift(
            this.myForm.get("series")?.value,
            this.selectedBusinessId,
            this.selectedOfficeId,
            this.myForm.get("description")?.value.toUpperCase(),
            status,
            this.selectedBrandId,
            this.selectedModelId,
            this.selectedMachineId,
            this.selectedtyreId,
            this.myForm.get("tyreForward")?.value,
            this.myForm.get("tyreSBack")?.value,
            this.selectedFuelId,
            this.selectedRoutineId,
            this.myForm.get("tonne")?.value,
            this.myForm.get("hoistedMast")?.value,
            this.myForm.get("contractedMast")?.value,
            this.myForm.get("startTime")?.value,
            this.myForm.get("currentTime")?.value,
            alarm,
            this.myForm.get("observation")?.value,
            localStorage.getItem("userid"),
            statusOwn
          )
          .then((data) => {
            const resp: any = data;

            if (resp.success === false) {
              Swal.fire({
                title: "Este equipo ya se encuentra registrado",
                text: "La serie ya se encuentra registrada en otro equipo",
                icon: "error",
              });
            } else {
              if (this.urls.length > 0) {
                this.upload(resp.data.id);
              }

              Swal.fire({
                title: "Equipo agregado",
                icon: "success",
              });
              this.router.navigateByUrl("/master/forkliftShow");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      Swal.fire({
        title: "Debe seleccionar todos los campos obligatorios",
        text: "Debe seleccionar todos los campos obligatorios",
        icon: "error",
      });
    }
  }

  onChangeAlarm(check: any) {
    this.switchAlarm = check;
  }

  onChangeStatus(check: any) {
    this.switchStatus = check;
  }

  onChangeOwn(check: any) {
    this.own = check;
  }

  onSelectFile(event:any) {
    let filesAmount:any= event.target.files.length;

    this.selectedFiles.push(event.target.files);
    let filename:any = event.target.files[event.target.files.length - 1].name;
    let allowedExtensions:any = /(.jpg|.jpeg|.png|.gif)$/i;
    let extFilename:any = filename.split(".").pop();

    if (
      extFilename === "jpg" ||
      extFilename === "jpeg" ||
      extFilename === "png"
    ) {
      if (this.urls.length <= 2) {
        if (event.target.files && event.target.files[0]) {
          for (let i = 0; i < filesAmount; i++) {
            let reader:any = new FileReader();
            reader.onload = (event: any) => {
              this.urls.push(event.target.result);
            };
            reader.readAsDataURL(event.target.files[i]);
          }
        }
      } else {
        Swal.fire({
          title: "El numero maximo de imagenes son 3",
          text: "No se pueden cargar mas de 3 imagenes",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "El formato del archivo, no es correcto",
        text: "Se permiten solo estas extensiones jpg, jpeg, png",
        icon: "error",
      });
    }
  }

  ngOnInit() {}

  deleteImage(i: number) {
    this.urls.splice(i - 1, 1);
  }

  upload(idForklift: number) {
    let file:any
    for ( file of this.selectedFiles) {
      const fileole = file[0];
      const uuid = UUID.UUID();
      const extension = fileole.name
        .substring(fileole.name.lastIndexOf("."))
        .toLowerCase();
      this.uploadService
        .uploadFileForklift(fileole, idForklift)
        .then((res) => {
          this.s3info = res;
          //this.insertNew();
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "oops a currido un error",
            text: "se ha presentado un error al subir la imagen",
            allowOutsideClick: false,
          });
        });
    }
  }

  goAdminForklifts() {
    this.router.navigateByUrl("master/forkliftShow");
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(
      this.cpService.stringToHsva(color, true),
      "rgba",
      null
    );
  }

  get checkForm() {
    return this.myForm.controls;
  }
}
