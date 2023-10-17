import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BatteryService } from "../../master-services/battery/battery.service";
import { RestService } from "../../master-services/Rest/rest.service";

import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: "app-master-battery",
  templateUrl: "./master-battery.component.html",
  styleUrls: [
    "./master-battery.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterbatteryComponent implements OnInit {
  myForm: FormGroup;
  // selectedBusinessId = 0;
  customerOffices: any;
  batterys: any;
  customers: any;
  fecha: any = 0;
  detail: number = 0;
  constructor(
    private BatteryService: BatteryService,
    private restService: RestService,
    private router: Router
  ) {
    this.getBatteryList();
    this.getCustomer();
    const brand = new FormControl("");
    const model = new FormControl("");
    const manufacturingDate = new FormControl("");
    const branchOfficesId = new FormControl("");
    const high = new FormControl("");
    const width = new FormControl("");
    const length = new FormControl("");
    const performance = new FormControl("");
    const connector = new FormControl("");
    const referenceColor = new FormControl("");
    const amperageCharger = new FormControl("");
    const voltage = new FormControl("");
    const charger = new FormControl("");
    const positiveCable = new FormControl("");
    const negativeCable = new FormControl("");
    const connections = new FormControl("");
    const stoppers = new FormControl("");
    const emptyVoltage = new FormControl("");
    const customer = new FormControl("");
    const id = new FormControl("0");

    this.myForm = new FormGroup({
      id: id,
      brand: brand,
      model: model,
      manufacturingDate: manufacturingDate,
      branchOfficesId: branchOfficesId,
      high: high,
      width: width,
      length: length,
      performance: performance,
      connector: connector,
      referenceColor: referenceColor,
      amperageCharger: amperageCharger,
      voltage: voltage,
      charger: charger,
      positiveCable: positiveCable,
      negativeCable: negativeCable,
      connections: connections,
      stoppers: stoppers,
      emptyVoltage: emptyVoltage,
      customer: customer,
      // selectedBusinessId: selectedBusinessId,
    });
  }

  getCustomer() {
    this.BatteryService.getCustomer()
      .then((data) => {
        const resp: any = data;
        this.customers = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBatteryList() {
    this.BatteryService.getBatteryList()
      .then((data) => {
        const resp: any = data;
        this.batterys = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  batteryDetailOn() {
    this.detail = 1;
  }

  batteryDetailOff() {
    this.detail = 0;
  }

  clearform() {
    this.myForm.get("id")?.setValue("");
    // this.myForm.get('selectedBusinessId').setValue('')
    this.myForm.get("brand")?.setValue("");
    this.myForm.get("model")?.setValue("");
    this.myForm.get("manufacturingDate")?.setValue("");
    this.myForm.get("branchOfficesId")?.setValue("");
    this.myForm.get("high")?.setValue("");
    this.myForm.get("width")?.setValue("");
    this.myForm.get("length")?.setValue("");
    this.myForm.get("performance")?.setValue("");
    this.myForm.get("connector")?.setValue("");
    this.myForm.get("referenceColor")?.setValue("");
    this.myForm.get("amperageCharger")?.setValue("");
    this.myForm.get("voltage")?.setValue("");
    this.myForm.get("charger")?.setValue("");
    this.myForm.get("positiveCable")?.setValue("");
    this.myForm.get("negativeCable")?.setValue("");
    this.myForm.get("connections")?.setValue("");
    this.myForm.get("stoppers")?.setValue("");
    this.myForm.get("emptyVoltage")?.setValue("");
    this.myForm.get("customer")?.setValue("");
  }

  getBateryById(id: number) {
    this.BatteryService.indexById(id).then((data) => {
      const resp: any = data;
      this.fecha = resp.data.manufacturing_date;
      this.getCustomerOfficeID(resp.data.customer_id);

      this.myForm.get("id")?.setValue(resp.data.id);
      // this.myForm.get('selectedBusinessId')?.setValue(resp.data.customer_id)
      this.myForm.get("brand")?.setValue(resp.data.brand);
      this.myForm.get("model")?.setValue(resp.data.model);
      this.myForm
        .get("manufacturingDate")
        ?.setValue(resp.data.manufacturing_date);
      this.myForm.get("branchOfficesId")?.setValue(resp.data.branch_offices_id);
      this.myForm.get("high")?.setValue(resp.data.high);
      this.myForm.get("width")?.setValue(resp.data.width);
      this.myForm.get("length")?.setValue(resp.data.length);
      this.myForm.get("performance")?.setValue(resp.data.performance);
      this.myForm.get("connector")?.setValue(resp.data.connector);
      this.myForm.get("referenceColor")?.setValue(resp.data.reference_color);
      this.myForm.get("amperageCharger")?.setValue(resp.data.amperage_charger);
      this.myForm.get("voltage")?.setValue(resp.data.voltage);
      this.myForm.get("charger")?.setValue(resp.data.charger);
      this.myForm.get("positiveCable")?.setValue(resp.data.positive_cable);
      this.myForm.get("negativeCable")?.setValue(resp.data.negative_cable);
      this.myForm.get("connections")?.setValue(resp.data.connections);
      this.myForm.get("stoppers")?.setValue(resp.data.stoppers);
      this.myForm.get("emptyVoltage")?.setValue(resp.data.empty_voltage);
      this.myForm.get("customer")?.setValue(resp.data.customer_id);
    });
  }

  getCustomerById(id: number) {}

  getCustomerOffice() {
    this.restService
      .getCustomerOffice(this.myForm.get("customer")?.value)
      .then((data) => {
        const resp: any = data;
        this.customerOffices = resp.data_branchoffices;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCustomerOfficeID(id: number) {
    this.restService
      .getCustomerOffice(id)
      .then((data) => {
        const resp: any = data;
        this.customerOffices = resp.data_branchoffices;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Almacena las baterías
  strageBattery() {
    if (!this.myForm.invalid) {
      Swal.fire('Validando información ...', 'info');

      // Swal({
      //   title: "Validando información ...",
      //   allowOutsideClick: false,
      // });
      Swal.showLoading();

      this.myForm.get("brand")?.value,
        this.BatteryService.strageBattery(
          this.myForm.get("id")?.value,
          this.myForm.get("brand")?.value,
          this.myForm.get("model")?.value,
          this.myForm.get("manufacturingDate")?.value,
          this.myForm.get("branchOfficesId")?.value,
          this.myForm.get("high")?.value,
          this.myForm.get("width")?.value,
          this.myForm.get("length")?.value,
          this.myForm.get("performance")?.value,
          this.myForm.get("connector")?.value,
          this.myForm.get("referenceColor")?.value,
          this.myForm.get("amperageCharger")?.value,
          this.myForm.get("voltage")?.value,
          this.myForm.get("charger")?.value,
          this.myForm.get("positiveCable")?.value,
          this.myForm.get("negativeCable")?.value,
          this.myForm.get("connections")?.value,
          this.myForm.get("stoppers")?.value,
          this.myForm.get("emptyVoltage")?.value
        )
          .then((data) => {
            const resp: any = data;
            if (resp.success === false) {
              


              Swal.fire('Mensaje',  resp.message, 'error');

            } else {

              // Swal.fire('Tercero agregado',  'error');

       

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tercero agregado',
              })
            }
          })
          .catch((error) => {
            console.log(error);
          });
      this.getBatteryList();
      this.clearform();
    }
  }

  batteryDetail(id: any) {
    localStorage.setItem("battery_id", id);
    this.router.navigateByUrl("maintenance/masterbattery/"+id);
  }

  blockAgents(vadr: any) {}

  ngOnInit() {}
}
