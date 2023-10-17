import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ForkliftService } from "../../master-services/Forklift/forklift.service";
import { PendingService } from "../../master-services/pending/pending.service";
import { RestService } from "../../master-services/Rest/rest.service";
import { ResumenesService } from "../../master-services/resumenes/resumenes.service";
declare var require: any;
const FileSaver = require("file-saver");

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

@Component({
  selector: "app-master-peding",
  templateUrl: "./master-peding.component.html",
  styleUrls: [
    "./master-peding.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
  providers: [
    // I18n,
    // { provide: NgbDatepickerI18n, useClass: MasterPedingComponent },
  ],
})
export abstract class  MasterPedingComponent extends NgbDatepickerI18n {
  selectedRegionalId: any = 0;
  selectedTechnician: any = 0;
  selectedBusinessId: any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedStatus: any = 0;
  customers: any;
  now: any;
  regional: any;

  branchOffices: any;

  technician: any;
  rowsClient: any;
  pendingGeneral: any;
  forkliftId: any;
  statusId: any;

  forklift: any = "";
  customerName: any = "";
  branch: any = "";

  fromDate: NgbDateStruct;
  untilDate: NgbDateStruct;

  status: any = 0;
  observation: string = "";
  consecutive: any;
  newStatus: any = 0;
  currentPending: any;
  forklifts: any;

  downloadPreventivePdf: any;
  downloadCorrectivePdf: any;
  downloadChecklistPdf: any;
  downloadPlatformPdf: any;
  downloadStevedorePdf: any;
  downloadBatteryPdf: any;

  constructor(
    private restService: RestService,
    public formatter: NgbDateParserFormatter,
    private _i18n: I18n,
    private router: Router,
    private resumenesService: ResumenesService,
    private pendingService: PendingService,
    private forkliftService: ForkliftService
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

    console.log(this.fromDate);
    console.log(this.untilDate);

    this.getRegional();
    // this.getUser();
    // this.getForkliftPendingGeneralMain();
    this.getPending();
    this.getFilters();
  }

  getUpdateDetail(row: any) {
    console.log(row);
    this.currentPending = row;
    if (this.currentPending.status == 0) {
      this.status = 1;
    }
    if (this.currentPending.status == 1) {
      this.status = 2;
      this.consecutive = this.currentPending.estimate;
    }
    if (this.currentPending.status == 2) {
      this.status = 3;
    }
    this.observation = this.currentPending.management_observation;

    document.getElementById("showAssignInvoice")?.click();
  }

  getForklifs() {
    if (this.selectedBranchOfficeId != 0) {
      console.log("this.selectedBusinessId.id");
      console.log(this.selectedBranchOfficeId);

      this.forkliftService
        .getForkliftBranchOfficesFull(this.selectedBranchOfficeId.id)
        .then((data) => {
          const resp: any = data;
          console.log(data);
          Swal.close();
          this.forklifts = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  }

  getPending() {
    this.pendingService
      .getPending()
      .then((data) => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.statusId = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
      });
  }

  getCustomerRegionals() {
    this.restService
      .getRegionalCustomers(this.selectedRegionalId.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.customers = resp.data;

        //asignar valores customer;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getForkliftPendingGeneralMain() {
    // Llenar información de cliente
    this.resumenesService
      .getForkliftPendingGeneral(49)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        Swal.close();
        this.pendingGeneral = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBranchOffices() {
    if (this.selectedBusinessId != 0) {
      // Llenar información de cliente
      this.restService
        .getOffice(this.selectedBusinessId.id)
        .then((data) => {
          const resp: any = data;
          console.log("oficinas: " + data);
          Swal.close();
          this.branchOffices = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.selectedBranchOfficeId = 0;
    }
  }

  getFilters() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();
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

    console.log(from_date);
    console.log(to_date);
    // console.log(this.selectedTechnician);
    console.log(this.selectedBusinessId);

    params = "from_date=" + from_date + "&to_date=" + to_date;

    if (this.selectedForkliftId != 0) {
      console.log("imprimir cont");
      // console.log(cont);
      params = params + "&&forklift_id=" + this.selectedForkliftId.id;
    }

    if (this.selectedBusinessId != 0) {
      console.log("imprimir cont");
      // console.log(cont);
      params = params + "&&customer_id=" + this.selectedBusinessId.id;
    }

    if (this.selectedBranchOfficeId != 0) {
      console.log("imprimir cont");
      // console.log(cont);

      params = params + "&&branch_offices_id=" + this.selectedBranchOfficeId.id;
    }

    if (this.selectedStatus != 0) {
      console.log("imprimir cont");
      // console.log(cont);
      params = params + "&&status=" + this.selectedStatus.id;
    }
    if (this.selectedRegionalId != 0) {
      //console.log('imprimir cont');
      // //console.log(cont);
      params = params + "&&regional_id=" + this.selectedRegionalId.id;
    }

    console.log(".---------->" + params);
    this.pendingService
      .getPendingAll(params)
      .then((data) => {
        const resp: any = data;
        console.log("info de filter");
        console.log(data);
        // this.customers  = resp.data;
        this.rowsClient = resp.data;
        console.log(resp.error);
        Swal.close();
        if (resp.error) {
          console.log("entro");
          Swal.fire({
            title: "Oops",
            text: "Hubo un error en la consulta.",
            icon: "error",
          });
        }
        // this.rowStatic =  resp.data;
        // this.rowsTemp = resp.data;
        // console.log( this.rowsClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  downloadPreventive(row: any) {
    Swal.showLoading();
    console.log(row);
    console.log("data importante");
    console.log(JSON.stringify(row));
    this.resumenesService
      .downloadPreventivePdf(row.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadPreventivePdf = resp.data;

        const pdfUrl = this.downloadPreventivePdf.url;
        const pdfName = "Matenimiento_Preventivo_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadCorrective(row: any) {
    Swal.showLoading();
    console.log(row.result.corrective.id);
    this.resumenesService
      .downloadCorrectivePdf(row.result.corrective.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadCorrectivePdf = resp.data;

        const pdfUrl = this.downloadCorrectivePdf.url;
        const pdfName = "Matenimiento_Correctivo_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadChecklist(row: any) {
    Swal.showLoading();
    console.log(row);
    this.resumenesService
      .downloadChecklistPdf(row.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadChecklistPdf = resp.data;

        const pdfUrl = this.downloadChecklistPdf.url;
        const pdfName = "Checklist_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadPlatform(row: any) {
    Swal.showLoading();
    console.log(row);
    this.resumenesService
      .downloadPlatformPdf(row.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadPlatformPdf = resp.data;

        const pdfUrl = this.downloadPlatformPdf.url;
        const pdfName = "Matenimiento_Plataforma_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);

        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadStevedore(row: any) {
    Swal.showLoading();
    console.log(row);
    this.resumenesService
      .downloadStevedorePdf(row.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadStevedorePdf = resp.data;

        const pdfUrl = this.downloadStevedorePdf.url;
        const pdfName = "Matenimiento_Estibador_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);

        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadBattery(row: any) {
    Swal.showLoading();
    console.log(row);
    this.resumenesService
      .downloadBatteryPdf(row.id)
      .then((data) => {
        const resp: any = data;
        console.log(data);
        this.downloadBatteryPdf = resp.data;

        const pdfUrl = this.downloadBatteryPdf.url;
        const pdfName = "Matenimiento_Bateria_Nro_" + row.consecutive;
        FileSaver.saveAs(pdfUrl, pdfName);
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
      });
  }

  downloadPdf(row: any) {
    console.log(row);
    if (row.type === "CORRECTIVO") {
      this.downloadCorrective(row);
    }
    if (row.type === "CHECKLIST") {
      this.downloadChecklist(row);
    }
    if (row.type === "PREVENTIVO") {
      this.downloadPreventive(row);
    }
    if (row.type === "PLATAFORMA") {
      this.downloadPlatform(row);
    }
    if (row.type === "ESTIBADORES") {
      this.downloadStevedore(row);
    }
    if (row.type === "BATERIA") {
      this.downloadBattery(row);
    }
  }

  updatePendings() {
    if (this.currentPending.type === "CORRECTIVO") {
      this.createCorrective();
    }
    if (this.currentPending.type === "CHECKLIST") {
      this.createChecklist();
    }
    if (this.currentPending.type === "PREVENTIVO") {
      this.createPreventive();
    }
    if (this.currentPending.type === "PLATAFORMA") {
      this.createPlatform();
    }
    if (this.currentPending.type === "ESTIBADORES") {
      this.createStevedore();
    }
    if (this.currentPending.type === "BATERIA") {
      this.createBattery();
    }
  }

  createPreventive() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }
    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updatePreventivePending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  createCorrective() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }

    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updateCorrectivePending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  createChecklist() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }

    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updateChecklistPending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  createPlatform() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }

    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updatePlatformpending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  createStevedore() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }

    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updateStevedorePending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  createBattery() {
    Swal.fire({
      title: "Obteniendo información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.status == 3) {
      this.newStatus = 2;
    }

    if (this.status == 1) {
      this.newStatus = 0;
    }

    console.log(this.newStatus);

    console.log(this.forklift);
    this.pendingService
      .updateBatteryPending(
        this.currentPending.pending,
        this.consecutive,
        this.observation,
        this.newStatus
      )
      .then((data) => {
        const resp: any = data;
        console.log(data);
        if (resp.success == false) {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error",
            icon: "error",
          });
        } else {
          Swal.close();

          let result = resp.data;
          console.log(result);
          this.addCancelDate();
          this.getFilters();
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error",
          icon: "error",
        });
        console.log(error);
      });
  }

  addCancelDate() {
    this.status = 0;
    this.observation = "";
    this.consecutive = null;
    this.newStatus = 0;
    document.getElementById("assignPrevetiveHide")?.click();
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
