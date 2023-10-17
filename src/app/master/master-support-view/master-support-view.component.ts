import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { MasterAdminComponent } from '../../master-layout/master-admin/master-admin.component';
import { SupportService } from '../../master-services/support/support.service';

@Component({
  selector: 'app-master-support-view',
  templateUrl: './master-support-view.component.html',
  styleUrls: ['./master-support-view.component.scss']
})
export class MasterSupportViewComponent implements OnInit {
  selectedFilesImages: Array<File> = [];
  selectedFiles: Array<File> = [];
  urlsImages = [];
  showSaveFile = false;

  comment: any;
  status: any;
  name: any;
  subject: any = '';
  description: any = '';
  ticket_id: any;
  cellphone: any;

  constructor(private supportService: SupportService, private router:Router, private activatedRoute: ActivatedRoute, private admin: MasterAdminComponent) {
    this.ticket_id = this.activatedRoute.snapshot.params.id;
    console.log(this.ticket_id);
    this.getTicketId(this.ticket_id);
    
  }

  getTicketId(id){
    console.log(this.description);
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading();
      this.supportService.getTicket(id).then(data=>{
        const resp:any=data;
       
        if(resp.success){
          this.description = resp.ticket.description;  
          this.subject = resp.ticket.subject;  
          this.name = resp.ticket.name;  
          this.status = resp.ticket.status;  
          this.comment = resp.ticket.comment;  
          this.cellphone = resp.ticket.cellphone;  
          this.urlsImages = resp.media; 
          swal.close(); 

          if(resp.ticket.status_response){
            this.updateStatusResponse();
          }
        }else{
          this.generalAlert("Error","Ha ocurrido un error","error");
        }
      }).catch(err=>{
        console.log(err);
        this.generalAlert("Ha ocurrido un error","Ocurrio un error durante la ejecución","error");
      });
  }


  updateStatusResponse(){
    this.supportService.updateStatusResponse(this.ticket_id).then(data => {
      const resp: any = data;
      console.log(resp);
      if(resp.error){
        console.log('entro')
        swal({
          title:'Oops',
          text: 'Hubo un error en la consulta.',
          type: 'error'
          });
      }else{
        this.admin.getCountResponseTicket();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  generalAlert(title:string,message:string,type:any){
    swal({
      title:title,
      text: message,
      type: type
     });
  }

  goAdminRoutines(){
    this.router.navigateByUrl('support/supportMain');
  }


  ngOnInit() {
  }

}
