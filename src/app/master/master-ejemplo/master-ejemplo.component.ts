import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { RestService } from "../../master-services/Rest/rest.service";

@Component({
  selector: "app-master-ejemplo",
  templateUrl: "./master-ejemplo.component.html",
  styleUrls: [
    "./master-ejemplo.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterEjemploComponent implements OnInit {
  myForm: FormGroup;
  conditionalPaymentId: number = 0;
  worth: number = 0;
  id: number = 0;
  selectedPaymentMargin: any = 0;
  paymentCondition: any;
  paymentConditions: any;
  paymentMargins: any;

  constructor(private restService: RestService) {
    // this.getPaymentCondition();
    const conditionalPaymentId = new FormControl(
      this.conditionalPaymentId,
      Validators.required
    );
    const worth = new FormControl(this.worth, Validators.required);
    const id = new FormControl("0");
    this.loadingData();
    this.getPaymentCondition();
    this.myForm = new FormGroup({
      conditionalPaymentId: conditionalPaymentId,
      worth: worth,
      id: id,
    });
  }

  cleanForm() {
    this.myForm.get("conditionalPaymentId")?.setValue("");
    this.myForm.get("worth")?.setValue(0);
    this.myForm.get("id")?.setValue(0);
  }

  loadingData() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restService
      .PaymentMargin()
      .then((data) => {
        const resp: any = data;
        Swal.close();
        this.paymentMargins = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadingDataById(id: number) {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restService
      .getByIdPaymentCondition(id)
      .then((data) => {
        const resp: any = data;
        this.myForm
          .get("conditionalPaymentId")
          ?.setValue(resp.data.conditional_payment_id);
        this.myForm.get("worth")?.setValue(resp.data.price_margin);
        this.myForm.get("id")?.setValue(resp.data.id);
        Swal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPaymentCondition() {
    Swal.fire({
      title: "Validando información ...",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.restService
      .getPaymentCondition()
      .then((data) => {
        const resp: any = data;
        this.paymentConditions = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sendPaymentMargin() {
    if (!this.myForm.invalid) {
      this.restService
        .activate2(
          this.myForm.get("conditionalPaymentId")?.value,
          this.myForm.get("worth")?.value,
          this.myForm.get("id")?.value
        )
        .then((data) => {
          const resp: any = data;
          this.loadingData();
          this.cleanForm();

          if (resp.success === false) {
            Swal.fire({
              title: "Error ",
              text: "No es posible guardar la información  ",
              icon: "error",
            });
          } else {
            document.getElementById("createBrandHide")?.click();
            Swal.fire({
              title: "Notificación",
              icon: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deletePaymentMargin(id: number) {
    Swal.fire({
      title: "Estás seguro de eliminar este elemento?",
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((willDelete) => {
      if (willDelete.value) {
        Swal.showLoading();
        this.restService
          .deletePaymentMargin(id)
          .then((data) => {
            Swal.showLoading();
            const resp: any = data;

            if (resp.success === false) {
              Swal.fire({
                title: "Error",
                text: "",
                icon: "error",
              });
            } else {
              // this.router.navigateByUrl('master/registerBrand');
              this.loadingData();
              Swal.fire({
                title: "El dato fue eliminado correctamente  ",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Swal('Fail');
      }
    });
  }

  ngOnInit() {}
}
