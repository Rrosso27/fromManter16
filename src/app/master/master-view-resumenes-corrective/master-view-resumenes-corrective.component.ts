import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../master-services/Rest/rest.service';
import { ResumenesService } from '../../master-services/resumenes/resumenes.service';

@Component({
  selector: 'app-master-view-resumenes-corrective',
  templateUrl: './master-view-resumenes-corrective.component.html',
  styleUrls: ['./master-view-resumenes-corrective.component.scss']
})
export class MasterViewResumenesCorrectiveComponent implements OnInit {

  
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
      this.getTechnician(this.rutine_id);
      this.getPending(this.rutine_id);
      this.getDelivery(this.rutine_id);
      this.getSupplice(this.rutine_id);
      this.getImages(this.rutine_id);
  }

  getDetail(id: any){
    console.log(id);
      this.resumenesService.getMakeRoutineCorrective(id).then(data => {
        const resp: any = data;
        console.log(data);
        this.detail = resp.data;
        for(let detail of this.detail){
          this.dateFinish = detail.assing.finish;
          this.dateStart = detail.assing.start;
          this.descriptionRutine = detail.work;
         
          this.rowsWork = detail.routines;
          
        }

        swal.close();
      
        }).catch(error => {
          console.log(error);
        });
  }

  getTechnician(id: any){
    console.log(id);
      this.resumenesService.getTechnicianRoutineCorrective(id).then(data => {
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
      this.resumenesService.getPedingCorrective(id).then(data => {
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
      this.resumenesService.getDeliveryReviewCorrective(id).then(data => {
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
      this.resumenesService.getSuppliceCorrective(id).then(data => {
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
    this.resumenesService.getCorrectiveImage(id).then(data => {
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
