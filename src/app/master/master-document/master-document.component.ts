import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert2";

import { RestService } from "../../master-services/Rest/rest.service";

@Component({
  selector: "app-master-document",
  templateUrl: "./master-document.component.html",
  styleUrls: [
    "./master-document.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss",
  ],
})
export class MasterEjemploComponent implements OnInit {
  constructor(private restService: RestService) {}

  ngOnInit() {}
}
