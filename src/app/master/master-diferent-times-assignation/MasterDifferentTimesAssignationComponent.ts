import { Component } from "@angular/core";
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct
} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ForkliftService } from "../../master-services/Forklift/forklift.service";
import { ReportsService } from "../../master-services/reports/reports.service";
import { RestService } from "../../master-services/Rest/rest.service";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { I18n, bussnessInterface, busnessOfficeInterface, officeInterface, OfficeForkliftInterface, forkliftInterface, typeMaintenanceInterface, statusMaintenanceInterface, tableInterface, EXCEL_TYPE, EXCEL_EXTENSION, I18N_VALUES } from "./master-different-times-assignation.component";
import { Types } from "aws-sdk/clients/s3";


interface I18NValues {
  [key: string]: {
    weekdays: string[];
    months: string[];
  };
}


@Component({
  selector: "app-master-different-times-assignation",
  templateUrl: "./master-different-times-assignation.component.html",
  styleUrls: [
    "./master-different-times-assignation.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
  providers: [
    // I18n,
    // {
    //   provide: NgbDatepickerI18n,
    //   useClass: MasterDifferentTimesAssignationComponent,
    // },
  ],
})



export  abstract  class MasterDifferentTimesAssignationComponent extends NgbDatepickerI18n {


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
  selectsType: Array<typeMaintenanceInterface> = [];
  selectType: any ;
  selectsStatus: Array<statusMaintenanceInterface> = [];
  selectStatus: any;
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
  checkAllType: any;
  checkAllStatus: any;

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
    this.getTyeMaintenance();
    this.getStatusMaintenance();
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
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al cargar las Sucursales",
          icon: "error",
        });
      });
  }

  getStatusMaintenance() {
    this.reportService
      .getStatusMaintenance()
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.status = resp.data;
        for (let item of this.status) {
          let datataStusMaintenanceInterface: statusMaintenanceInterface = {
            id: item.id,
            name: item.description,
            select: false,
          }
          this.selectStatus = datataStusMaintenanceInterface
          this.selectsStatus.push(this.selectStatus);
        }
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

  getTyeMaintenance() {
    this.reportService
      .getTyeMaintenance()
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.type = resp.data;
        for (let item of this.type) {

          let dataTypeMaintenanceInterface:typeMaintenanceInterface = {
            id: item.id,
            name: item.description,
            select: false,
          }
          this.selectType = dataTypeMaintenanceInterface;
          this.selectsType.push(this.selectType);
        }
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

            let dataSelectBusness :bussnessInterface = {
              id: item.id,
              name: item.business_name,
              select: false,
            }
            this.selectBusness = dataSelectBusness;
            this.selectsBusness.push(this.selectBusness);
          }

          //asignar valores customer;
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

    // Llenar información de cliente
    let item:any
    for (item of this.selectsBusness) {
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

              let dataofficeInterface:officeInterface ={
                id: value.id,
                name: value.branch_name,
                select: false,
              }

              this.selectOffice = dataofficeInterface;
              this.selectsOffices.push(this.selectOffice);
            }

            let databusnessOfficeInterface : busnessOfficeInterface  ={
              customer: item.name,
              office: this.selectsOffices,
            }

            this.selectsBusnessOffice = databusnessOfficeInterface;

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

     let value: any;
     let item:any;
    for ( value of this.selectsBusnessOffices) {
      for ( item of value.office) {

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
                let dataForkliftInterface:forkliftInterface = {
                  id: item.id,
                  name: item.full_name,
                  select: false,
                }
                this.selectForklift = dataForkliftInterface;
                this.selectsForklift.push(this.selectForklift);
              }
              let dataOfficeForkliftInterface:OfficeForkliftInterface = {
                office: item.name,
                forklift: this.selectsForklift,
              }
              this.selectOfficeForklift = dataOfficeForkliftInterface;
              this.selectsOfficeForklift.push(this.selectOfficeForklift);
              this.selectsForklift = [];
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
    // Swal.close();
  }

  checkUncheckAllType(event: any) {
    this.checkAllType = event.target.checked;
    for (let i = 0; i < this.selectsType.length; i++) {
      this.selectsType[i].select = event.target.checked;
    }
  }

  checkUncheckAllStatus(event: any) {
    this.checkAllStatus = event.target.checked;
    for (let i = 0; i < this.selectsStatus.length; i++) {
      this.selectsStatus[i].select = event.target.checked;
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
        text: "Debes seleccionar por lo menos una Sucuarsal.",
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
      let monthUntil = (this.untilDate.month < 10 ? "0" : "") + this.untilDate.month;
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

      // if(cont >=1){
      let busness = "";
      let forklift = "";
      let office = "";

      if (this.selectsStatus[0].select) {
        params = params + "&pending=" + this.selectsStatus[0].name;
        cont++;
      }
      if (this.selectsStatus[1].select) {
        params = params + "&start=" + this.selectsStatus[1].name;
        cont++;
      }
      if (this.selectsStatus[2].select) {
        params = params + "&finish=" + this.selectsStatus[2].name;
        cont++;
      }
      if (this.selectsStatus[3].select) {
        params = params + "&firm=" + this.selectsStatus[3].name;
        cont++;
      }

      for (let item of this.selectsBusness) {
        if (item.select) {
          busness = busness + item.id + ",";
        }
      }
      if (busness != "") {
        params = params + "&customer=" + busness;
        let value:any
        for ( value of this.selectsBusnessOffices) {
          for (let item of value.office) {
            if (item.select) {
              office = office + item.id + ",";
            }
          }
        }
        if (office != "") {
          params = params + "&office=" + office;
          let value :any
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
        .showFilterDurationTimes(params)
        .then((data) => {
          const resp: any = data;
          this.rowsClient = resp.data;
          for (let data of resp.data) {
            let status;
            if (data.status == 0) {
              status = "Pendiente";
            }
            if (data.status == 1) {
              status = "Iniciado";
            }
            if (data.status == 2) {
              status = "Finalizado";
            }
            if (data.status == 3) {
              status = "Pendiente Por Firma";
            }
            let dataTableInterface :tableInterface = {
              Consecutivo: data.consecutive,
              Cliente: data.customer,
              Sede: data.office,
              Equipo: data.full_name,
              Tipo: data.type,
              Estado: status,
              Fecha_Asignado: data.date,
              Fecha_Inicio: data.start,
              Fecha_Fin: data.finish,
              Diferecia_tiempo_a_Iniciar: data.time_start,
              Duracion_Actividad: data.duration_activity,
              Trabajo_Realizado: data.work,
            }
            this.dataExcel = dataTableInterface
            this.dataExcels.push(this.dataExcel);
          }
          this.exportAsExcelFile(
            this.dataExcels,
            "Informe Diferencia de Tiempo de Mantenimiento Correctivo" +
            fromD +
            " - " +
            untilD
          );
          Swal.close();

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
        Sheets: { "Info-Dif-Tiempos": worksheet },
        SheetNames: ["Info-Dif-Tiempos"],
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

  ngOnInit() { }
}
