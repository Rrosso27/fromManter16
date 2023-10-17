import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BatteryService } from "../../master-services/battery/battery.service";
import { RestService } from "../../master-services/Rest/rest.service";
import { ActivatedRoute, Params } from "@angular/router";

import { Router } from "@angular/router";


@Component({
  selector: "app-master-battery",
  templateUrl: "./master-battery-detail.component.html",
  styleUrls: [
    "./master-battery-detail.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterBatteryDetailComponent implements OnInit {
  myForm: FormGroup;
  id: any = localStorage.getItem("battery_id");

  customerOffices: any;
  customers: any;

  constructor(
    private BatteryService: BatteryService,
    private restService: RestService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
    this.getBattery(this.id);
    this.getCustomer();
    // this.id = this.rutaActiva.snapshot.params.id;
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

  //generar los datos de la batería seleccionada
  getBattery(id: any) {
    this.BatteryService.indexById(id).then((data) => {
      const resp: any = data;
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


  volber(){
    this.router.navigateByUrl("maintenance/masterbattery");

  }

  blockAgents(vadr: any) {}

  ngOnInit() {}
}
