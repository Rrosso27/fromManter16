import { Component, Injectable, OnInit } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { ForkliftService } from "../../master-services/Forklift/forklift.service";
import { ReportsService } from "../../master-services/reports/reports.service";
import { RestService } from "../../master-services/Rest/rest.service";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2/dist/sweetalert2.js'




const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

const I18N_VALUES = {
  fr: {
    weekdays: ["Lun", "Mar", "Mié", "Juv", "Vie", "Sáb", "Dom"],
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Agos",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  // other languages you would support
};

@Injectable()
export class I18n {
  language = "fr";
}

interface I18NValues {
  [key: string]: {
    weekdays: string[];
    months: string[];
  };
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
  Items_Cotizacion?: number;
  Total_Cotizacion?: string;
  Items_Liquidacion?: number;
  Total_Liquidacion?: string;
  Porcentaje_Items?: string;
  Porcentaje_Totales?: string;
}

@Component({
  selector: "app-master-estimate-settlement-report",
  templateUrl: "./master-estimate-settlement-report.component.html",
  styleUrls: [
    "./master-estimate-settlement-report.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
  // providers: [
  //   I18n,
  //   {
  //     provide: NgbDatepickerI18n,
  //     useClass: MasterEstimateSettlementReportComponent,
  //   },
  // ],
})
export abstract class MasterEstimateSettlementReportComponent extends NgbDatepickerI18n {
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
  dataExcel: any;

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
  checkAllType: boolean = false;
  checkAllStatus: boolean = false;
  checkAllBussines: boolean = false;

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
        Swal.close();
        this.regional = resp.data;
      })
      .catch((error) => {
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
    this.selectsBusnessOffices = [];
    this.selectsOfficeForklift = [];
    if (this.selectedRegionalId != 0) {
      this.restService
        .getRegionalCustomers(this.selectedRegionalId.id)
        .then((data) => {
          const resp: any = data;
          Swal.close();
          this.customers = resp.data;
          for (let item of this.customers) {

            let selectBusness: bussnessInterface = {
              id: item.id,
              name: item.business_name,
              select: false,
            };

            this.selectsBusness.push(selectBusness);
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

  checkAllBusiness(){
    for (let item of this.selectsBusness) {
      item.select = !this.checkAllBussines;
    }
    this.checkAllBussines = !this.checkAllBussines;
    this.getBranchOffices();
  }

  getBranchOffices() {
    this.selectsOffices = [];
    this.selectsBusnessOffices = [];

    // Llenar información de cliente
    let item:any
    for ( item of this.selectsBusness) {
      this.selectsOffices = [];
      if (item.select) {
        Swal.fire({
          title: "Validando información ...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        this.restService
          .getOfficeWithRegional(item.id, this.selectedRegionalId.id)
          .then((data) => {
            const resp: any = data;

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
              this.selectOffice = officeInterface;

              this.selectsOffices.push(this.selectOffice);
            }

            let selectsBusnessOffice:busnessOfficeInterface  = {
              customer: item.name,
              office: this.selectsOffices,
            };


            this.selectsBusnessOffice = selectsBusnessOffice;

            this.selectsBusnessOffices.push(this.selectsBusnessOffice);
            this.selectsOffices = [];
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
    let value:any
    for ( value of this.selectsBusnessOffices) {
      for (let item of value.office) {
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

              this.forklifts = resp.data;
              for (let item of this.forklifts) {

                let forkliftInterface:forkliftInterface ={
                  id: item.id,
                  name: item.full_name,
                  select: false,
                }
                this.selectForklift = forkliftInterface;

                this.selectsForklift.push(this.selectForklift);
              }
              let OfficeForkliftInterface : OfficeForkliftInterface = {
                office: item.name,
                forklift: this.selectsForklift,
              }
              this.selectOfficeForklift = OfficeForkliftInterface;
              this.selectsOfficeForklift.push(this.selectOfficeForklift);
              this.selectsForklift = [];
              Swal.close();
            })
            .catch((error) => {
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al cargar los equipos",
                icon: "error",
              });
            });
        }
      }
    }
    // Swal.close();
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
        text: "Debes seleccionar una Sucuarsal.",
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
        if (item.select) {
          busness = busness + item.id + ",";
        }
      }
      if (busness != "") {
        params = params + "&customer=" + busness;
        let value: any
        for ( value of this.selectsBusnessOffices) {
          for (let item of value.office) {
            if (item.select) {
              office = office + item.id + ",";
            }
          }
        }
        if (office != "") {
          params = params + "&office=" + office;
          let value:any
          for ( value of this.selectsOfficeForklift) {
            for (let item of value.forklift) {
              if (item.select) {
                forklift = forklift + item.id + ",";
              }
            }
            if (forklift != "") {
              params = params + "&forklift=" + forklift;
            }
          }
        }
      }

      this.reportService
        .showEstimateSettelements(params)
        .then((data) => {
          const resp: any = data;
          this.rowsClient = resp.data;
          for (let data of resp.data) {
            if (data.settlement.length > 0) {
              for (let item of data.settlement) {
                let value = Number(item.total_settlement).toFixed(0);
                let value2 = Number(data.total_estimate).toFixed(0);
                let val = Number(value.replace(".", ""));
                let val2 = Number(value2.replace(".", ""));
                let tableInterface:tableInterface = {
                  Cliente: data.customer,
                  Items_Cotizacion: data.quantity_estimate,
                  Total_Cotizacion: "$" + data.total_est,
                  Items_Liquidacion: item.quantity_settlement,
                  Total_Liquidacion: "$" + item.total_set,
                  Porcentaje_Items:
                    Number(
                      (Number(item.quantity_settlement) * 100) /
                        Number(data.quantity_estimate)
                    ).toFixed(1) + "%",
                  Porcentaje_Totales:
                    Number(Number(val * 100) / val2).toFixed(1) + "%",
                }
                this.dataExcel = tableInterface
                this.dataExcels.push(this.dataExcel);
              }
            } else {
              this.dataExcel = {
                Cliente: data.customer,
                Items_Cotizacion: data.quantity_estimate,
                Total_Cotizacion: "$" + data.total_estimate,
              };
              this.dataExcels.push(this.dataExcel);
            }
          }
          this.exportAsExcelFile(
            this.dataExcels,
            "Informe de Costos Por Cotizaciones " + fromD + " - " + untilD
          );
          Swal.close();

          console.log(resp.error);
          if (resp.error) {
            Swal.fire({
              title: "Oops",
              text: "Hubo un error en la consulta.",
              icon: "error",
            });
          }
          if (this.rowsClient.length == 0) {
            Swal.fire({
              title: "Oops",
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
        Sheets: { "Info-Cotizaciones": worksheet },
        SheetNames: ["Info-Cotizaciones"],
      };

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
    const I18N_VALUES: I18NValues = {
      fr: {
        weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      },
      // Otros idiomas...
    };

    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    const I18N_VALUES: I18NValues = {
      fr: {
        weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      },
      // Otros idiomas...
    };


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

      if (fromD > untilD) {
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
      this.fromDate = this.untilDate;
    }
  }

  ngOnInit() {}
}
