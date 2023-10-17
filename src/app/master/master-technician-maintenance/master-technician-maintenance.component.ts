import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { ReportsService } from "../../master-services/reports/reports.service";
import { RestService } from "../../master-services/Rest/rest.service";
import { ResumenesService } from "../../master-services/resumenes/resumenes.service";
import { MasterSettlementAllComponent } from "../master-settlement-all/master-settlement-all.component";

declare var require: any;
const FileSaver = require("file-saver");

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

interface maintenanceInterface {
  // item para mostrar clientes
  id?: number;
  name?: string;
  select?: boolean;
}

@Injectable()
export class I18n {
  language = "fr";
}

@Component({
  selector: "app-master-technician-maintenance",
  templateUrl: "./master-technician-maintenance.component.html",
  styleUrls: [
    "./master-technician-maintenance.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
  providers: [
    I18n,
    {
      provide: NgbDatepickerI18n,
      useClass: MasterTechnicianMaintenanceComponent,
    },
  ],
})
export class MasterTechnicianMaintenanceComponent extends NgbDatepickerI18n {
  selectsType: Array<maintenanceInterface> = [];
  selectType: maintenanceInterface;
  selectsStatus: Array<maintenanceInterface> = [];
  selectStatus: maintenanceInterface;

  selectedRegionalId: any = 0;
  selectedTechnician: any = 0;
  selectedBusinessId: any = 0;
  selectedBranchOfficeId: any = 0;
  customers: any;
  now: any;
  regional: any;

  branchOffices: any;

  technician: any;
  rowsClient: any;

  forklift: any = "";
  customerName: any = "";
  branch: any = "";

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;

  downloadPreventivePdf: any;
  downloadCorrectivePdf: any;
  downloadChecklistPdf: any;
  downloadPlatformPdf: any;
  downloadStevedorePdf: any;
  downloadBatteryPdf: any;
  downloadReportPdf: any;

  checkAllType: boolean;
  checkAllStatus: boolean;

  type: any;
  status: any;
  elementDelete: any;

  constructor(
    private restService: RestService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private _i18n: I18n,
    private router: Router,
    private resumenesService: ResumenesService,
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

    //console.log(   this.fromDate);
    //console.log(   this.untilDate);

    this.getStatusMaintenance();
    this.getTyeMaintenance();
    this.getRegional();
    this.getUser();
    // this.getFilters();
  }

  getRegional() {
    this.restService
      .getRegionalAll()
      .then((data) => {
        const resp: any = data;
        //console.log(data);
        swal.close();
        this.regional = resp.data;
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getUser() {
    swal({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();
    //console.log(this.selectedRegionalId);
    this.restService
      .getTechnician()
      .then((data) => {
        const resp: any = data;
        //console.log(data);

        this.technician = resp.data;
        swal.close();
      })
      .catch((error) => {
        swal.close();
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
        //console.log(error);
      });
  }

  getCustomerRegionals() {
    this.restService
      .getRegionalCustomers(this.selectedRegionalId.id)
      .then((data) => {
        const resp: any = data;
        //console.log(data);
        swal.close();
        this.customers = resp.data;

        //asignar valores customer;
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getBranchOffices() {
    if (this.selectedBusinessId != 0) {
      // Llenar información de cliente
      this.restService
        .getOffice(this.selectedBusinessId.id)
        .then((data) => {
          const resp: any = data;
          //console.log('oficinas: '+data);
          swal.close();
          this.branchOffices = resp.data;
        })
        .catch((error) => {
          //console.log(error);
        });
    } else {
      this.selectedBranchOfficeId = 0;
    }
  }

  getFiltersInitial() {
    swal({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    swal.showLoading();
    let params = "";
    let cont = 0;

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

    //  var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
    //  var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
    var from_date = fromD + " 00:00:00";
    var to_date = untilD + " 23:59:59";

    //console.log(from_date);
    //console.log(to_date);
    //console.log(this.selectedTechnician);
    //console.log(this.selectedBusinessId);

    params = "from_date=" + from_date + "&to_date=" + to_date;
    params = params + "&Preventivo=Preventivo";
    params = params + "&Bateria=Bateria";
    params = params + "&Checklist=Checklist";
    params = params + "&Correctivo=Correctivo";
    params = params + "&Plataforma=Plataforma";
    params = params + "&Estibador=Estibador";

    if (this.selectedTechnician != 0) {
      //console.log('imprimir cont');
      // //console.log(cont);
      params = params + "&&user_id=" + this.selectedTechnician.id;
    }
    if (this.selectedBusinessId != 0) {
      //console.log('imprimir cont');
      // //console.log(cont);
      params = params + "&&customer_id=" + this.selectedBusinessId.id;
    }
    if (this.selectedBranchOfficeId != 0) {
      //console.log('imprimir cont');
      // //console.log(cont);
      params = params + "&&branch_offices_id=" + this.selectedBranchOfficeId.id;
    }

    //console.log('.---------->'+params);
    this.resumenesService
      .getTechnicianRoutine(params)
      .then((data) => {
        const resp: any = data;
        //console.log('info de filter');
        //console.log(data);
        // this.customers  = resp.data;
        this.rowsClient = resp.data;
        //console.log(resp.error);
        swal.close();
        if (resp.error) {
          //console.log('entro')
          swal({
            title: "Oops",
            text: "Hubo un error en la consulta.",
            type: "error",
          });
        }
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // //console.log( this.rowsClient);
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getFilters() {
    //Poner validacion de la regional
    if (this.selectedRegionalId != 0) {
      swal({
        title: "Validando información ...",
        allowOutsideClick: false,
      });
      swal.showLoading();
      let params = "";
      let cont = 0;

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

      //  var fromD = this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day; //31 de diciembre de 2015
      //  var untilD = this.untilDate.year+'-'+this.untilDate.month+'-'+this.untilDate.day;
      var from_date = fromD + " 00:00:00";
      var to_date = untilD + " 23:59:59";

      //console.log(from_date);
      //console.log(to_date);
      //console.log(this.selectedTechnician);
      //console.log(this.selectedBusinessId);

      params = "from_date=" + from_date + "&to_date=" + to_date;

      if (this.selectsType[0].select) {
        params = params + "&battery=Bateria";
        cont++;
      }
      if (this.selectsType[1].select) {
        params = params + "&checklist=Checklist";
        cont++;
      }
      if (this.selectsType[2].select) {
        params = params + "&corrective=Correctivo";
        cont++;
      }
      if (this.selectsType[3].select) {
        params = params + "&platform=Plataforma";
        cont++;
      }
      if (this.selectsType[4].select) {
        params = params + "&preventive=Preventivo";
        cont++;
      }
      if (this.selectsType[5].select) {
        params = params + "&stevedore=Estibador";
        cont++;
      }
      if (cont > 0) {
        if (this.selectsStatus[0].select) {
          params = params + "&Pendiente=" + this.selectsStatus[0].name;
          cont++;
        }
        if (this.selectsStatus[1].select) {
          params = params + "&Iniciado=" + this.selectsStatus[1].name;
          cont++;
        }
        if (this.selectsStatus[2].select) {
          params = params + "&Finalizado=" + this.selectsStatus[2].name;
          cont++;
        }
        if (this.selectsStatus[3].select) {
          params = params + "&Firma=" + this.selectsStatus[3].name;
          cont++;
        }
        if (this.selectedTechnician != 0) {
          //console.log('imprimir cont');
          // //console.log(cont);
          params = params + "&&user_id=" + this.selectedTechnician.id;
        }
        if (this.selectedBusinessId != 0) {
          //console.log('imprimir cont');
          // //console.log(cont);
          params = params + "&&customer_id=" + this.selectedBusinessId.id;
        }
        if (this.selectedBranchOfficeId != 0) {
          //console.log('imprimir cont');
          // //console.log(cont);
          params = params + "&&branch_offices_id=" + this.selectedBranchOfficeId.id;
        }
        if (this.selectedRegionalId != 0) {
          //console.log('imprimir cont');
          // //console.log(cont);
          params = params + "&&regional_id=" + this.selectedRegionalId.id;
        }

        console.log(".---------->" + params);
        this.resumenesService
          .getTechnicianRoutine(params)
          .then((data) => {
            const resp: any = data;
            //console.log('info de filter');
            //console.log(data);
            // this.customers  = resp.data;
            this.rowsClient = resp.data;
            //console.log(resp.error);
            swal.close();
            if (resp.error) {
              //console.log('entro')
              swal({
                title: "Oops",
                text: "Hubo un error en la consulta.",
                type: "error",
              });
            }
            // this.rowStatic =  resp.data;
            // this.rowsTemp = resp.data;
            // //console.log( this.rowsClient);
          })
          .catch((error) => {
            //console.log(error);
          });
      } else {
        swal({
          title: "Oops",
          text: "Debes seleccionar un tipo de mantenimiento.",
          type: "error",
        });
      }
    } else {
      swal({
        title: "Oops",
        text: "Debes seleccionar al menos una sucursal.",
        type: "error",
      });
    }
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

      //console.log(this.fromDate.day);
      if (fromD > untilD) {
        //console.log('es mayor');
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
      //console.log('es mayor');
      this.fromDate = this.untilDate;
    }
  }

  viewResumenes(row: any) {
    if (row.status == 0 || row.status == 1) {
      swal({
        title: "Error",
        text: "No se puede descargar el archivo por lo que no se ha finalizado el mantenimiento no se ha finalizado",
        type: "error",
      });
    } else {
      if (row.type === "CORRECTIVO") {
        this.downloadCorrective(row);
        // this.router.navigateByUrl('maintenance/viewCorrective/'+row.id);
      }
      if (row.type === "CHECKLIST") {
        this.downloadChecklist(row);
        // this.router.navigateByUrl('maintenance/viewChecklist/'+row.id);
      }
      if (row.type === "PREVENTIVO") {
        this.downloadPreventive(row);
        // this.router.navigateByUrl('maintenance/viewPreventive/'+row.id);
      }
      if (row.type === "PLATAFORMA") {
        this.downloadPlatform(row);
        // this.router.navigateByUrl('maintenance/viewPlatform/'+row.id);
      }
      if (row.type === "ESTIBADORES") {
        this.downloadStevedore(row);
        // this.router.navigateByUrl('maintenance/viewStevedore/'+row.id);
      }
      if (row.type === "REPORTE TÉCNICO") {
        this.downloadReport(row);
        // this.router.navigateByUrl('maintenance/updateForkliftReport/'+row.id);
      }
      if (row.type === "BATERIA") {
        this.downloadBattery(row);
        // this.router.navigateByUrl('maintenance/updateForkliftReport/'+row.id);
      }
    }
  }

  downloadPreventive(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadPreventivePdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadPreventivePdf = resp.data;
        if (this.downloadPreventivePdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadPreventivePdf.url;
          const pdfName = "Matenimiento_Preventivo_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadCorrective(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadCorrectivePdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadCorrectivePdf = resp.data;
        if (this.downloadCorrectivePdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadCorrectivePdf.url;
          const pdfName = "Matenimiento_Correctivo_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadChecklist(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadChecklistPdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadChecklistPdf = resp.data;

        if (this.downloadChecklistPdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadChecklistPdf.url;
          const pdfName = "Checklist_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadPlatform(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadPlatformPdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadPlatformPdf = resp.data;
        if (this.downloadPlatformPdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadPlatformPdf.url;
          const pdfName = "Matenimiento_Plataforma_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
        }
        swal.close();
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadStevedore(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadStevedorePdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadStevedorePdf = resp.data;
        if (this.downloadStevedorePdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadStevedorePdf.url;
          const pdfName = "Matenimiento_Estibador_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);

          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadBattery(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadBatteryPdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadBatteryPdf = resp.data;
        if (this.downloadBatteryPdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del mantenimiento",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadBatteryPdf.url;
          const pdfName = "Matenimiento_Bateria_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  downloadReport(row: any) {
    swal.showLoading();
    // //console.log(row);
    this.resumenesService
      .downloadReportPdf(row.id)
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        this.downloadReportPdf = resp.data;
        if (this.downloadReportPdf == null) {
          swal({
            title: "Error",
            text: "No se ha encontrado el archivo del reporte",
            type: "error",
          });
        } else {
          const pdfUrl = this.downloadReportPdf.url;
          const pdfName = "Repote_Técnico_Nro_" + row.consecutive;
          FileSaver.saveAs(pdfUrl, pdfName);
          swal.close();
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error",
          type: "error",
        });
      });
  }

  getStatusMaintenance() {
    this.reportService
      .getStatusMaintenance()
      .then((data) => {
        const resp: any = data;
        // //console.log(data);
        swal.close();
        this.status = resp.data;
        for (let item of this.status) {
          this.selectStatus = {
            id: item.id,
            name: item.description,
            select: false,
          };
          this.selectsStatus.push(this.selectStatus);
        }
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error al cargar las Sucursales",
          type: "error",
        });
      });
  }

  getTyeMaintenance() {
    this.reportService
      .getTyeMaintenance()
      .then((data) => {
        const resp: any = data;
        //console.log(data);
        swal.close();
        this.type = resp.data;
        for (let item of this.type) {
          this.selectType = {
            id: item.id,
            name: item.description,
            select: false,
          };
          this.selectsType.push(this.selectType);
        }
        this.getFiltersInitial();
      })
      .catch((error) => {
        //console.log(error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error al cargar las Sucursales",
          type: "error",
        });
      });
  }

  checkUncheckAllType(event: any) {
    this.checkAllType = event.target.checked;
    for (let i = 0; i < this.selectsType.length; i++) {
      //console.log('lo encontre'+i);
      this.selectsType[i].select = event.target.checked;
    }
  }

  checkUncheckAllStatus(event: any) {
    this.checkAllStatus = event.target.checked;
    for (let i = 0; i < this.selectsStatus.length; i++) {
      //console.log('lo encontre'+i);
      this.selectsStatus[i].select = event.target.checked;
    }
  }

  deleteRoutine(item: any) {
    swal.showLoading();
    //console.log(item);
    if (item.type == "CHECKLIST") {
      this.deleteChecklist(item.id);
    }
    if (item.type == "PREVENTIVO") {
      this.deletePreventive(item.id);
    }
    if (item.type == "CORRECTIVO") {
      this.deleteCorrective(item.id);
    }
    if (item.type == "PLATAFORMA") {
      this.deletePlatform(item.id);
    }
    if (item.type == "ESTIBADOR") {
      this.deleteStevedore(item.id);
    }
    if (item.type == "BATERIA") {
      this.deleteBattery(item.id);
    }
  }

  deleteChecklist(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);
        this.resumenesService
          .deleteChecklistMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });
              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
    });
  }

  deleteCorrective(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);

        this.resumenesService
          .deleteCorrectiveMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });

              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
    });
  }

  deletePreventive(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);

        this.resumenesService
          .deletePreventiveMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });

              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
    });
  }

  deleteBattery(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);

        this.resumenesService
          .deleteBatteryMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });

              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
    });
  }

  deletePlatform(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);

        this.resumenesService
          .deletePlatformMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });

              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
    });
  }

  deleteStevedore(id: number) {
    swal({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        this.elementDelete = id;
        //console.log(id);
        //console.log(this.elementDelete);

        this.resumenesService
          .deleteStevedoreMaintenance(this.elementDelete)
          .then((data) => {
            swal.showLoading();
            const resp: any = data;
            //console.log(resp);

            if (resp.success === false) {
              swal({
                title: "Esta rutina presenta problemas",
                text: "Esta rutina no se puede eliminar",
                type: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              swal({
                title: "Elemento eliminado",
                type: "success",
              });

              this.getFilters();
            }
          })
          .catch((error) => {
            //console.log(error);
            swal({
              title: "Esta rutina presenta problemas",
              text: "Esta rutina no se puede eliminar",
              type: "error",
            });
          });
        //console.log(this.elementDelete);
      } else {
        // swal('Fail');
      }
      //console.log(willDelete);
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

  ngOnInit() {}
}
