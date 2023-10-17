import { Component, OnInit } from '@angular/core';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-master-view-resumenes-preventive',
  templateUrl: './master-view-resumenes-preventive.component.html',
  styleUrls: ['./master-view-resumenes-preventive.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MasterViewResumenesPreventiveComponent implements OnInit {

  descriptionRutine: any;
  dateFinish: any;
  dateStart: any;

  rutine_id:any;
  detail: any;
  rowsWork: any;
  technician: any;

  pending: any;
  delivery: any;
  supplice: any;
  
  urlImages: any;

  constructor(private restService: RestService, private resumenesService: ResumenesService, private router: Router, 
    private rutaActiva: ActivatedRoute) { 
    this.rutine_id = this.rutaActiva.snapshot.params.id;
      this.getDetail(this.rutine_id);
  }

  getDetail(id: any){
    console.log(id);
      this.resumenesService.getMakeRoutinePreventive(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.detail = resp.data;
        for(let detail of this.detail){
          this.dateFinish = detail.assing.finish;
          this.dateStart = detail.assing.start;
          this.getTechnician(detail.assing.id);
          this.getPending(detail.assing.id);
          this.getDelivery(detail.assing.id);
          this.getSupplice(detail.assing.id);
          this.getImages(detail.assing.id);

            for(let routine of detail.routines){
                this.descriptionRutine = routine.routine[0].description;
                this.rowsWork = routine.detail_make;
            }
        }

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getTechnician(id: any){
    console.log(id);
      this.resumenesService.getTechnicianRoutinePreventive(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.technician = resp.data;
        

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getPending(id: any){
    console.log(id);
      this.resumenesService.getPedingPreventive(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.pending = resp.data;
        

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getDelivery(id: any){
    console.log(id);
      this.resumenesService.getDeliveryReviewPreventive(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.delivery = resp.data;
        

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getSupplice(id: any){
    console.log(id);
      this.resumenesService.getSupplicePreventive(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.supplice = resp.data;
        

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getImages(id){
    console.log(id);
    this.resumenesService.getPreventiveImage(id).then(data => {
      const resp: any = data;
      console.log(data);
      this.urlImages = resp.data;
      swal.close();
    
      }).catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
