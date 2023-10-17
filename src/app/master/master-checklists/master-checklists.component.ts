import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../master-services/Work/work.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ChecklistService } from '../../master-services/checklist/checklist.service';

@Component({
  selector: 'app-master-checklists',
  templateUrl: './master-checklists.component.html',
  styleUrls: ['./master-checklists.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterChecklistsComponent implements OnInit {

  rowsWork: any;
  rowtodelete: any;

  constructor(private workService: WorkService, private router: Router, private checklistService: ChecklistService) {
    this.getChecklist();
  }

  getChecklist() {
    this.checklistService.showChecklist().then(data => {
      const resp: any = data;
      if (resp.error) {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error',
          icon: 'error'
        });
      } else {
        this.rowsWork = resp.data;

      }
    }).catch(error => {
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error',
        icon: 'error'
      });
      console.log(error);
    });
  }

  redirecttodetails() {
    this.router.navigateByUrl('maintenance/registerChecklist');
  }

  goToTpdateView(row: any) {
    this.router.navigateByUrl('maintenance/updateChecklist/' + row.id);
  }
  deleteWorkHeader(workrow: any) {
    Swal.fire({
      title: "Confirmacion",
      text: "esta seguro que desea borrar este elemento?",
      cancelButtonText: "No",
      confirmButtonText: "Si",
      showCancelButton: true,
      showConfirmButton: true
    }).then(goingtodelete => {
      if (goingtodelete.value) {
        this.loader();
        this.rowtodelete = workrow;
        this.checklistService.deleteChecklist(this.rowtodelete.id).then(data => {
          const resp: any = data;
          if (resp.success == false) {
            this.generalAlert('Error', 'ocurrio un error durante el procesado', "error");
          } else {
            this.generalAlert('Rutina eliminada', 'Rutina eliminada correctamente', 'success');
            this.getChecklist();
          }
        }).catch(err => {
          console.log(err);
          this.generalAlert('Error', 'ocurrio un error durante el procesado', "error");
        });
      } else {
      }
    });
  }

  generalAlert(title: string, text: string, type: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: type
    })
  }

  loader() {
    Swal.fire({
      title: "procesando informacion",
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    Swal.showLoading();
  }


  ngOnInit() {
  }

}
