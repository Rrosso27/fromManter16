import { Component, Injectable, OnInit } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ForkliftService } from "../../master-services/Forklift/forklift.service";
import { ReportsService } from "../../master-services/reports/reports.service";
import { RestService } from "../../master-services/Rest/rest.service";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

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
  language = "fr";
}

interface bussnessInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface typeMaintenanceInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface statusMaintenanceInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface busnessOfficeInterface {
  // item para mostrar clientes
  customer?: string;
  office?: Array<officeInterface>;
}

interface officeInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface OfficeForkliftInterface {
  // item para mostrar clientes
  office?: string;
  forklift?: Array<forkliftInterface>;
}

interface forkliftInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

interface tableInterface {
  Cliente?: string;
  Sede?: string;
  Equipo?: string;
  Horometro_Inicial?: number;
  Horometro_Final?: number;
  Diferencia?: number;
}

@Component({
  selector: "app-master-report-horometer",
  templateUrl: "./master-report-horometer.component.html",
  styleUrls: [
    "./master-report-horometer.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],

})
export abstract class MasterReportHorometerComponent extends NgbDatepickerI18n {
  selectsBusness: Array<bussnessInterface> = [];
  selectBusness: any;
  selectsBusnessOffices: Array<busnessOfficeInterface> = [];
  selectsBusnessOffice: any;
  selectsOffices: Array<officeInterface> = [];
  selectOffice: any;
  selectsOfficeForklift: Array<OfficeForkliftInterface> = [];
  selectOfficeForklift: any;
  selectsForklift: Array<forkliftInterface> = [];
  selectForklift: any;

  dataExcels: Array<tableInterface> = [];
  dataExcel:any;

  selectedBusinessId: any = 0;
  selectedRegionalId: any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedStatus: any = 0;
  selectedType: any = 0;

  branchOffices: any;
  forklifts: any;
  customers: any;
  regional: any;
  rowsClient: any;
  type: any;
  status: any;
  checkAllType: boolean = true;
  checkAllStatus: boolean = true;

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;

  constructor(
    private restService: RestService,
    public formatter: NgbDateParserFormatter,
    private _i18n: I18n,
    private forkliftService: ForkliftService,
    private reportService: ReportsService
  ) {
    super();

    var date = new Date();
    var ngbDateStruct = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    this.fromDate = ngbDateStruct;
    this.untilDate = ngbDateStruct;

    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.getRegional();
  }

  getRegional() {
    this.restService
      .getRegionalAll()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.regional = resp.data;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al cargar las Sucursales",
          icon: "error",
        });
      });
  }

  getCustomerRegionals() {
    this.selectsBusness.length = 0;
    this.selectsBusness = [];
    console.log(this.selectsBusness);
    this.selectsBusnessOffices = [];
    this.selectsOfficeForklift = [];
    console.log(this.selectedRegionalId.id);
    if (this.selectedRegionalId != 0) {
      this.restService
        .getRegionalCustomers(this.selectedRegionalId.id)
        .then((data) => {
          const resp: any = data;
          console.log(data);
          Swal.close();
          this.customers = resp.data;
          for (let item of this.customers) {
            let bussnessInterface:bussnessInterface = {
              id: item.id,
              name: item.business_name,
              select: false,
            }
            this.selectBusness = bussnessInterface
            this.selectsBusness.push(this.selectBusness);
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al cargar a los clientes",
            icon: "error",
          });
        });
    }
  }

  getBranchOffices() {
    this.selectsOffices = [];
    this.selectsBusnessOffices = [];
    console.log(this.selectsOffices);
    console.log(this.selectsBusness);
    // Llenar información de cliente
    let item:any
    for ( item of this.selectsBusness) {
      this.selectsOffices = [];
      console.log(this.selectsOffices);
      console.log("paso");
      console.log(item.select);
      if (item.select) {
        console.log(item);
        Swal.fire({
          title: "Validando información ...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        this.restService
          .getOfficeWithRegional(item.id, this.selectedRegionalId.id)
          .then((data) => {
            const resp: any = data;
            console.log(data);

            if (resp.data.error) {
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error las sedes",
                icon: "error",
              });
            }
            for (let value of resp.data) {
              let officeInterface:officeInterface = {
                id: value.id,
                name: value.branch_name,
                select: false,
              }
              this.selectOffice =officeInterface
              this.selectsOffices.push(this.selectOffice);
            }
            console.log(item.id);
            console.log(item.name);
            console.log(this.selectsOffices);
            let busnessOfficeInterface:busnessOfficeInterface = {
              customer: item.name,
              office: this.selectsOffices,
            }
            this.selectsBusnessOffice = busnessOfficeInterface
            this.selectsBusnessOffices.push(this.selectsBusnessOffice);
            this.selectsOffices = [];
            console.log(this.selectsBusnessOffices);
            Swal.close();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error las sedes",
              icon: "error",
            });
          });
      }
    }
  }

  getForklifs() {
    this.selectsForklift = [];
    this.selectsOfficeForklift = [];
    console.log(this.selectsForklift);
    console.log(this.selectsOffices);
    console.log(this.selectsBusnessOffices);
    let value:any
    for (value of this.selectsBusnessOffices) {
      console.log(value);
      for (let item of value.office) {
        console.log(item);

        if (item.select) {
          Swal.fire({
            title: "Validando información ...",
            allowOutsideClick: false,
          });
          Swal.showLoading();
          this.forkliftService
            .getForkliftBranchOfficesFull(item.id)
            .then((data) => {
              const resp: any = data;
              console.log(data);

              this.forklifts = resp.data;
              for (let item of this.forklifts) {
                let forkliftInterface:forkliftInterface = {
                  id: item.id,
                  name: item.full_name,
                  select: false,
                }
                this.selectForklift = forkliftInterface
                this.selectsForklift.push(this.selectForklift);
              }
              let OfficeForkliftInterface:OfficeForkliftInterface = {
                office: item.name,
                forklift: this.selectsForklift,
              }
              this.selectOfficeForklift =OfficeForkliftInterface
              this.selectsOfficeForklift.push(this.selectOfficeForklift);
              this.selectsForklift = [];
              console.log(this.selectsOfficeForklift);
              Swal.close();
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al cargar los equipos",
                icon: "error",
              });
            });
        }
      }
    }
  }

  getFilters() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.selectedRegionalId == 0) {
      Swal.fire({
        title: "Importante",
        text: "Debes seleccionar una Sucursal.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      let params = "";
      let cont = 0;

      // poner los 0
      var day = (this.fromDate.day < 10 ? "0" : "") + this.fromDate.day;
      // 01, 02, 03, ... 10, 11, 12
      let month = (this.fromDate.month < 10 ? "0" : "") + this.fromDate.month;
      // 1970, 1971, ... 2015, 2016, ...
      var year = this.fromDate.year;

      // until poner los ceros
      var dayUntil = (this.untilDate.day < 10 ? "0" : "") + this.untilDate.day;
      // 01, 02, 03, ... 10, 11, 12
      let monthUntil =
        (this.untilDate.month < 10 ? "0" : "") + this.untilDate.month;
      // 1970, 1971, ... 2015, 2016, ...
      var yearUntil = this.untilDate.year;

      var fromD = year + "-" + month + "-" + day;
      var untilD = yearUntil + "-" + monthUntil + "-" + dayUntil;
      //var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
      // var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
      params =
        "from_date=" +
        fromD +
        " 00:00:00" +
        "&to_date=" +
        untilD +
        " 23:59:59&regional=" +
        this.selectedRegionalId.id;

      let busness = "";
      let forklift = "";
      let office = "";

      for (let item of this.selectsBusness) {
        console.log("entro");
        if (item.select) {
          console.log(item);
          console.log("entro");
          busness = busness + item.id + ",";
        }
      }
      if (busness != "") {
        console.log(params);
        params = params + "&customer=" + busness;
        console.log(params);
        let value:any
        for ( value of this.selectsBusnessOffices) {
          for (let item of value.office) {
            console.log("entro");
            if (item.select) {
              console.log(item);
              console.log("entro");
              office = office + item.id + ",";
            }
          }
        }
        if (office != "") {
          console.log(params);
          params = params + "&office=" + office;
          console.log(params);
          let value:any
          for ( value of this.selectsOfficeForklift) {
            for (let item of value.forklift) {
              console.log("entro");
              if (item.select) {
                console.log(item);
                console.log("entro");
                forklift = forklift + item.id + ",";
              }
            }
            if (forklift != "") {
              params = params + "&forklift=" + forklift;
            }
          }
        }
      }

      console.log(".---------->" + params);
      this.reportService
        .showHorometerForklift(params)
        .then((data) => {
          const resp: any = data;
          console.log(resp);
          this.rowsClient = resp.data;
          for (let data of resp.data) {
            let different = Number(data.last.horometer - data.first.horometer);
            let tableInterface:tableInterface = {
              Cliente: data.data.customer,
              Sede: data.data.office,
              Equipo: data.data.full_name,
              Horometro_Inicial: data.last.horometer,
              Horometro_Final: data.first.horometer,
              Diferencia: different,
            }
            this.dataExcel =tableInterface
            this.dataExcels.push(this.dataExcel);
          }
          this.exportAsExcelFile(
            this.dataExcels,
            "Informe de Horometro de Equipos " + fromD + " - " + untilD
          );
          Swal.close();

          console.log(resp.error);
          if (resp.error) {
            console.log("entro");
            Swal.fire({
              title: "Oops",
              text: "Hubo un error en la consulta.",
              icon: "error",
            });
          }
          if (this.rowsClient.length == 0) {
            Swal.fire({
              title: "Importante",
              text: "No hay resultado en la consulta.",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Oops",
            text: "Hubo un error en la consulta.",
            icon: "error",
          });
        });
    }
  }

  public exportAsExcelFile(rows: any[], excelFileName: string): void {
    if (rows.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
      const workbook: XLSX.WorkBook = {
        Sheets: { "Info-Horometro": worksheet },
        SheetNames: ["Info-Horometro"],
      };
      console.log(workbook.Sheets);
      console.log(workbook.SheetNames);
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    } else {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
      });
    }
  }
  private saveAsExcelFile(buffer: any, baseFileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, baseFileName + EXCEL_EXTENSION);
    Swal.close();
    this.dataExcels.length = 0;
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
    if (this.untilDate) {
      var fromD = new Date(
        this.fromDate.year,
        this.fromDate.month,
        this.fromDate.day
      ); //31 de diciembre de 2015
      var untilD = new Date(
        this.untilDate.year,
        this.untilDate.month,
        this.untilDate.day
      );

      console.log(this.fromDate.day);
      if (fromD > untilD) {
        console.log("es mayor");
        this.untilDate = this.fromDate;
      }
    }
  }

  onDateSelectionUntil(date: any) {
    var fromD = new Date(
      this.fromDate.year,
      this.fromDate.month,
      this.fromDate.day
    ); //31 de diciembre de 2015
    var untilD = new Date(
      this.untilDate.year,
      this.untilDate.month,
      this.untilDate.day
    );
    if (untilD < fromD) {
      console.log("es mayor");
      this.fromDate = this.untilDate;
    }
  }

  ngOnInit() {}
}
