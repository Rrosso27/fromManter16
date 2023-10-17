import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SupportService } from '../../master-services/support/support.service';

@Component({
  selector: 'app-master-support-main',
  templateUrl: './master-support-main.component.html',
  styleUrls: ['./master-support-main.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterSupportMainComponent implements OnInit {

  rowsWork: any;
  rowtodelete:any;

  constructor(private supportService: SupportService, private router:Router) {
    this.getSupport();
  }

  
  getSupport() {
    this.supportService.getTicketsByUser(localStorage.getItem('userid')).then(data => {
      const resp: any = data;
      if (resp.error) {
        swal({
          title:'Error',
          text: 'Ha ocurrido un error',
          type: 'error'
         });
      } else {
        console.log(data);
        this.rowsWork = resp.data;
        console.log( this.rowsWork);
    }
    }).catch(error => {
      swal({
        title:'Error',
        text: 'Ha ocurrido un error',
        type: 'error'
       });
      console.log(error);
    });
  }

  redirecttodetails(){
    this.router.navigateByUrl('support/supportTicketRegister');
  }

  redirectToView(item: any){
    this.router.navigateByUrl('support/supportViewTicket/'+item.id);
  }

  deleteSupport(item:any){
    swal({
      title:"Confirmacion",
      text:"esta seguro que desea borrar este elemento?",
      cancelButtonText:"No",
      confirmButtonText:"Si",
      showCancelButton:true,
      showConfirmButton:true
    }).then(goingtodelete=>{
      if (goingtodelete.value) {
        this.loader();
        this.rowtodelete=item;
        console.log(this.rowtodelete);
        this.supportService.deleteTicket(this.rowtodelete.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','ocurrio un error durante el procesado',"error");
          }else{
              this.generalAlert('','ticket eliminado',"success");
              this.getSupport();
          }
        }).catch(err=>{
          console.log(err);
          this.generalAlert('Error','ocurrio un error durante el procesado',"error");
        });
      } else {
        console.log("proceso cancelado");
      }
    });
  }

  generalAlert(title:string,text:string,type:any){
    swal({
      title:title,
      text:text,
      type:type
    })
  }

  loader(){
    swal({
      title:"Procesando información",
      allowEscapeKey:false,
      allowOutsideClick:false
    });
    swal.showLoading();
  }



  ngOnInit() {
  }

}
