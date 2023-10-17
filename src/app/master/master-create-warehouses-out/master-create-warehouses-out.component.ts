import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../master-services/Rest/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-create-warehouses-out',
  templateUrl: './master-create-warehouses-out.component.html',
  styleUrls: ['./master-create-warehouses-out.component.scss']
})
export class MasterCreateWarehousesOutComponent implements OnInit {

  selectedTypeDocumentId: any;
  selectedCustomer: any;
  selectedBranchOffice: any;
  selectedTechnician: any;
  selectForkLift: any;


  typeDocuments: any;
  customers: any;
  branchOffices: any;
  forkLift: any;
  technicians: any;

  emailCustomer: any;
  masterEmail: any;

  submitted = false;

  myForm: FormGroup;

  constructor(private restService: RestService, private router: Router) {

    const customer = new FormControl('', Validators.required);
    const branchOffice = new FormControl('', Validators.required);
    const technician = new FormControl('', Validators.required);
    const quantity = new FormControl('', Validators.required);
    const reference = new FormControl('', Validators.required);
    const unitCost = new FormControl('', Validators.required);
    const totalCost = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const control = new FormControl('', Validators.required);
    const estimate = new FormControl('', Validators.required);
    const liquidation = new FormControl('', Validators.required);
    const consumption = new FormControl('', Validators.required);
    const observation = new FormControl('', Validators.required);

    this.myForm = new FormGroup({
      customer: customer,
      branchOffice: branchOffice,
      technician: technician,
      quantity: quantity,
      reference: reference,
      unitCost: unitCost,
      totalCost: totalCost,
      description: description,
      control: control,
      estimate: estimate,
      liquidation: liquidation,
      consumption: consumption,
      observation: observation,
    });
  }

  getCustomers() {
    this.restService.getCustomers().then(data => {
      const resp: any = data;
      this.customers = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }



  getOffices(idCustomer: number) {
    this.restService.getCustomerOffice(idCustomer).then(data => {
      const resp: any = data;
      this.branchOffices = resp.data_branchoffices;

    }).catch(error => {
      console.log(error);
    });
  }

  getForkLift(idOffice: number) {
    this.restService.getForkLift(idOffice).then(data => {
      const resp: any = data;
      this.forkLift = resp.data;

    }).catch(error => {
      console.log(error);
    });
  }

  getTechnician() {
    this.restService.getTechnician().then(data => {
      const resp: any = data;
      this.technicians = resp.data;
    }).catch(error => {
      console.log(error);
    });
  }

  ChangingValue() {
    this.getOffices(this.selectedCustomer.id);
  }

  ChangingValueBranch() {
    this.getForkLift(this.selectedBranchOffice.id);
  }

  sendWarehousesOut() { }

  ngOnInit() {
  }

  get checkForm() { return this.myForm.controls; }


}
