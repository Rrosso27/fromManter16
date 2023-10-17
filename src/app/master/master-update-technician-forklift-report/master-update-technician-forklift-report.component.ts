import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { PersonalService } from '../../master-services/personal/personal.service';
import { RestService } from '../../master-services/Rest/rest.service';
import { UploadService } from '../../master-services/services/upload.service';

interface FileSettlementInterface {
  id?: number;
  url?: string;
  content?: string;
  type?: number;
  file?:any;
}


interface emailFormat {// item para mostrar selccionados
  email?: string;
  contact?: string;
}



@Component({
  selector: 'app-master-update-technician-forklift-report',
  templateUrl: './master-update-technician-forklift-report.component.html',
  styleUrls: ['./master-update-technician-forklift-report.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterUpdateTechnicianForkliftReportComponent implements OnInit {

  selectedFiles: Array<File> = [];
  fileSettlement: FileSettlementInterface;

  emailsSend: Array <emailFormat> = [];
  emailSend:emailFormat;



  selectedBusinessId: any = 0;
  selectedRegionalId:any = 0;
  selectedBranchOfficeId: any = 0;
  selectedForkliftId: any = 0;
  selectedReporId: any = 0;
  selectedReporDetailId: any = 0;
  selectedUpdateReporDetailId: any = 0;

  urlsFiles=[];
  customers: any;
  regional: any;

  branchOffices: any;
  forklifts: any;
  report: any
  reportDetail: any

  headerinfo:any;
  parts:any;
  partsId:any;
  partForm:FormGroup;
  updatePartForm:FormGroup;

  switchUpdate = false;

  image:any
  makeForklift:any
  header:any
  headerId:any
  
  currentPart:any
  part:any
  observation:any
  s3info:any
  elementDelete:any
  showSaveFile=false;

  contFiles=0;

  subject:any='';
  masterEmail: any;
  masterName: any;
  emailCustomer: any = '';
  comment:'';
  
  constructor(private restService: RestService, private personalServices:PersonalService, private router: Router, 
    private forkliftService: ForkliftService, private activatedRoute: ActivatedRoute, private uploadService: UploadService) {

     

      this.headerId = this.activatedRoute.snapshot.params.id;
      this.getReportForkliftDetail(this.headerId);

      const partDescription = new FormControl('',Validators.required);
      // const reportDetail = new FormControl('',Validators.required);

    this.partForm= new FormGroup({
      partDescription:partDescription,
      // reportDetail:reportDetail,

    });

    const partDescriptionUpdate = new FormControl('',Validators.required);
    // const reportDetailUpdate = new FormControl('',Validators.required);

    this.updatePartForm= new FormGroup({
      partDescriptionUpdate:partDescriptionUpdate,
      // reportDetailUpdate:reportDetailUpdate,

    });
   }

  
  getRegional(){
    this.restService.getRegionalAll().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.regional  = resp.data;
      // this.selectedRegionalId = this.header.regional_id;
      console.log(this.selectedRegionalId);
      console.log(this.selectedBusinessId);
    }).catch(error => {
      console.log(error);
    });
  }

  getCustomerRegionals() {
    console.log('entro');
    this.restService.getRegionalCustomers(this.selectedRegionalId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.customers  = resp.data;
      this.selectedBusinessId = this.header.customer_id;
      console.log(this.selectedBusinessId);

      
      //asignar valores customer;
    
    }).catch(error => {
      console.log(error);
    });
   }

  getReportTechnicians() {
    this.personalServices.getReportTechnician().then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.report  = resp.data;

      this.selectedReporId =  this.header.technical_reports_id;
      //asignar valores customer;
      this.getReportTechnicianDetail();
    }).catch(error => {
      console.log(error);
    });
   }

  getReportForkliftDetailMake() {
    this.personalServices.getForkliftReportMake(this.headerId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.makeForklift  = resp.data;

      
      //asignar valores customer;
    
    }).catch(error => {
      console.log(error);
    });
   }

  getReportTechnicianDetail() {
    this.personalServices.getReportTechnicianDetail(this.selectedReporId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.reportDetail  = resp.data;
      
      //asignar valores customer;
    
    }).catch(error => {
      console.log(error);
    });
   }
  getReportTechnicianImage() {
    this.personalServices.getForkliftReportImage(this.headerId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      for(let img of resp.data ){
        this.fileSettlement = {
          id:img.id,
          url:img.image
        }
        this.urlsFiles.push(this.fileSettlement);
      }
      // this.image = this.urlsFiles;
      // console.log(this.image);
      console.log(this.urlsFiles);
      // this.image  = resp.data;
      // this.urlsFiles  = this.image;
      
      //asignar valores customer;
    
    }).catch(error => {
      console.log(error);
    });
   }

  getReportForkliftDetail(id: number) {
    this.personalServices.getForkliftReportId(id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.header  = resp.data.header;
      // this.image  = resp.data.image;
      // this.urlsFiles  = this.image;
      this.makeForklift  = resp.data.make;
      this.selectedRegionalId = this.header.regional_id;
      this.selectedBusinessId = this.header.customer_id;
      this.selectedBranchOfficeId = this.header.branch_offices_id;
      this.selectedForkliftId = this.header.forklift_id;
      //asignar valores customer;
      for(let img of resp.data.image ){
        this.fileSettlement = {
          id:img.id,
          url:img.image
        }
        this.urlsFiles.push(this.fileSettlement);
      }
      this.image = this.urlsFiles;
      console.log(this.image);
      console.log(this.urlsFiles);
      this.getRegional();
      this.getCustomerRegionals();
      this.getBranchOffices();
      this.getForklifs();
      this.getReportTechnicians();
    
    }).catch(error => {
      console.log(error);
    });
   }

   

  getBranchOffices() {
    if(this.selectedBusinessId!=0){
    
    // Llenar información de cliente  
    this.restService.getOffice(this.selectedBusinessId).then(data => {
      const resp: any = data;
      console.log('oficinas: '+data);
      swal.close();
      this.branchOffices  = resp.data;

      this.selectedBranchOfficeId = this.header.branch_offices_id;
    }).catch(error => {
      console.log(error);
    });
  
   
    }else{
      this.selectedBranchOfficeId=0;
      this.selectedForkliftId=0;
    }
  }

  getForklifs() {
    if(this.selectedBranchOfficeId!=0){
    console.log('this.selectedBusinessId.id');
    console.log(this.selectedBranchOfficeId);

  this.forkliftService.getForkliftBranchOfficesFull(this.selectedBranchOfficeId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.forklifts  = resp.data;

      this.selectedForkliftId = this.header.forklift_id;
 
    }).catch(error => {
      console.log(error);
    });
  }else{
    
  }
  }

  finish(detail:any){
    // console.log(row);
    console.log(detail);
    // console.log(observ);
    console.log('informacion de la parte');
    // console.log(this.part);
    // console.log(this.observation);
  }

  validateCondition(){
    if(this.selectedReporId != 0){
      this.getReportTechnicianDetail();
      document.getElementById('showPart').click();
    }else{
      this.generalAlert("Ha ocurrido un error.","Seleccione y actualice el encabezado con el reporte a diligenciar.","error");
    }
  }

  updateParts(row: any){
    this.currentPart = row;
    console.log( this.currentPart );
    this.updatePartForm.get('partDescriptionUpdate').setValue(this.currentPart.technical_report_details_description);
    this.selectedUpdateReporDetailId = row.technical_report_details_id;
   document.getElementById('showPartUpdate').click();
  }

  sendUpdatePart(part: any){
    console.log(part);
    if(part.work != null) {
      swal({
        title: 'Obteniendo información ...',
        allowOutsideClick: false
      });
      swal.showLoading(); 
      var work =part.work;
      var id =part.id;
      this.personalServices.updateReportForkliftPart(id,work).then(data=>{
        const resp:any=data;
        console.log(data);
        this.partsId=resp.data;
        console.log("part information");
        console.log(this.partsId)
        swal.close();
        this.getReportForkliftDetailMake();
      }).catch(err=>{
  
        console.log(err);
        this.generalAlert("Ha ocurrido un error.","Ocurrio un error durante la ecución","error");
      });
    }else{
      this.generalAlert("Ha ocurrido un error.","Debe diigenciar el item","error");
    }
  }

  deletePart(workrow:any){
    swal({
      title:"Confirmacion",
      text:"esta seguro que desea borrar este elemento?",
      cancelButtonText:"No",
      confirmButtonText:"Si",
      showCancelButton:true,
      showConfirmButton:true
    }).then(goingtodelete=>{
      if (goingtodelete.value) {
        swal({
          title:"procesando informacion",
          allowEscapeKey:false,
          allowOutsideClick:false
        });
        swal.showLoading();
        this.reportDetail=workrow;
        console.log(this.reportDetail);
        this.personalServices.deleteForkliftReportDetail(this.reportDetail.id).then(data=>{
          const resp:any=data;
          if (resp.success==false){
            this.generalAlert('Error','Ocurrio un error durante el procesado',"error");
          }else{
            this.generalAlert('Reporte eliminada','Rutina eliminada correctamente','success');
            this.getReportForkliftDetailMake();
          }
        }).catch(err=>{
          console.log(err);
          this.generalAlert('Error','Ocurrio un error durante el procesado',"error");
        });
      } else {
        console.log("proceso cancelado");
      }
    });
  }

  storagePart(part: any){
    if(this.selectedReporDetailId!=0){
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading(); 
    var work =part.value.partDescription;
    this.personalServices.createReportForkliftPart(this.headerId,this.selectedRegionalId,this.selectedReporId,this.selectedReporDetailId.id,
      this.selectedReporDetailId.description,work).then(data=>{
      const resp:any=data;
      console.log(data);
      this.partsId=resp.data;
      console.log("part information");
      console.log(this.partsId)
      swal.close();
      
    }).catch(err=>{

      console.log(err);
      this.generalAlert("Ha ocurrido un error.","Ocurrio un error durante la ecución","error");
    });
  }else{
    this.generalAlert("Ha ocurrido un error.","Debe seleccionar el item  diigenciar","error");
  }
  }

  
  updateHeader(){
  // console.log(this.title);
  if ((this.selectedRegionalId!=0) || (this.selectedBusinessId!=0) || (this.selectedBranchOfficeId==0)
   || (this.selectedForkliftId==0) || this.selectedReporId != 0) {
    swal({
      title: 'Obteniendo información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.personalServices.updateReportForklift(this.headerId,this.selectedRegionalId,this.selectedBusinessId,this.selectedBranchOfficeId,
      this.selectedForkliftId,this.selectedReporId).then(data=>{
      const resp:any=data;
      console.log(data);
      this.headerinfo=resp.data;
      console.log("header information");
      console.log(this.headerinfo)
      swal.close();
      // this.router.navigateByUrl('maintenance/reportUpdate/'+this.headerinfo.id);
    }).catch(err=>{

      console.log(err);
      this.generalAlert("Ha ocurrido un error.","Ocurrio un error durante la ecucion","error");
    });
  }else{
    this.generalAlert("Ha ocurrido un error.","Complete todos los campos obligatorios","error");
  }
}

uploadAll(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  this.uploadFiles();

   swal({
      title: 'Archivos guardados',
      type: 'success'
     });

}

normalize(element: string) {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
}

normalizes = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç#+*%&!¡¿?", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

uploadFiles() {
  console.log(this.selectedFiles)
  for (let fileCurrent of this.selectedFiles) {
  const file = fileCurrent[0];
  console.log(file);
 //  const uuid = UUID.UUID();
 // console.log(uuid);
  console.log(file.name + '.' + file.type);

  let nameTemp= this.removeAccents(this.normalizes(file.name.replace(/\s/g,"")));
  const extension = (file.name.substring(file.name.lastIndexOf('.'))).toLowerCase();
  console.log(extension);
  this.uploadService.uploadFilesAllReport(file,this.headerId,nameTemp).then(res=>{
    console.log('s3info'+JSON.stringify(res));
    this.s3info=res;
    console.log(this.s3info);
    this.urlsFiles.length=0
    console.log(this.urlsFiles);
    this.getReportTechnicianImage();
    /*swal({
      title: 'Archivos guardados',
      type: 'success'
     });*/

     swal.close();
     this.showSaveFile=false; 
  }).catch(error=> {
    console.log(error);
    swal({
      type: 'error',
      title: 'Oops a currido un error',
      text:'Se ha presentado un error al subir la imagen',
      allowOutsideClick: false
    });
  });
}
this.selectedFiles.length = 0
}


onSelectFile(event) {
  var filesAmount = event.target.files.length;

  
  var filename = event.target.files[event.target.files.length-1].name;
  console.log('Nombre de archivo');
  console.log(filename);
  //  var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
  //  console.log(allowedExtensions.exec(filename));
  var extFilename = filename.split('.').pop();

  console.log('-----');
  console.log(extFilename);

 // if(extFilename !=='jpg' && extFilename !=='jpeg' && extFilename !=='png'){
    console.log('filename que es');
    var filename = event.target.files[event.target.files.length-1].name;
    console.log('nombre de archivo '+filename);

    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files)
      console.log('se van a cargar a la variable= ' + event.target.files)
      this.selectedFiles.push(event.target.files); 
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                  // this.urlsImages.push(event.target.result);
                 
                   
            this.fileSettlement={
                url: event.target.result,
                file: event.target.files
              };

              this.urlsFiles.push(this.fileSettlement);
                  
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }

    // this.fileSettlement={
    //   id: 0,
    //   url: filename      
    // };
    // console.log(event)
    // console.log(event.target.result)
    // console.log(event.target.files);
    // this.urlsFiles.push( this.fileSettlement); 
    // this.selectedFiles.push(event.target.files);
  /*}else{
  swal({
    title: 'El formato del archivo, no es correcto',
    text: 'No se permite cargar archivos con extensión jpg, jpeg, png ',
    type: 'error'
  });
  }*/
}

removeAccents (str){
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

validateEmail( email ) 
  {
      var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email) ? true : false;
  }
  
addEmail(){
  console.log('este es el valor de email: '+ this.masterEmail);
  if(this.validateEmail(this.masterEmail)){
    this.emailSend={
      email: this.masterEmail,
      contact: this.masterName
    }
    this.emailsSend.push(this.emailSend);

    this.masterEmail='';
    this.masterName='';
  }else{
    swal({
      text:'Debe ingresar un correo electrónico valido',
      type: 'error'
     });
  } 
}

deleteEmail(index:number){
    
  /* const control =<FormArray>this.detailform.controls['emails'];
   control.removeAt(index);
   this.indice--;*/
   this.emailsSend.splice(index);
}


sendEmailEstimate(){
  swal({
    title: 'Validando información ...',
    allowOutsideClick: false
  });
  swal.showLoading();
  let subjectTemp; //= 'Montacargas Master Cotización '+ this.estimateCurrent.estimate_consecutive;
  if((this.subject.trim()).length>0){
    console.log('importante el subject:'+this.subject)
    subjectTemp= this.subject;
  }else{
    subjectTemp= 'Reporte Tecnico Nro '+ this.header.technical_reports_consecutive;
  }
 // concatenar los correos y nos con ","
let emailsName = '';
 for (let i = 0; i < this.emailsSend.length; i++) {
   if(i!==0){
    emailsName=emailsName+'|';
   }
    emailsName=emailsName+this.emailsSend[i].email+'|'+this.emailsSend[i].contact;
 }

 if( this.masterEmail != '' &&  this.masterName != '' ){

  emailsName= this.masterEmail+'|'+ this.masterName+'|'+ emailsName;
}

 console.log('------------------');
 console.log(emailsName);
 console.log('---------------------');

  if(this.emailsSend.length>0){
  

  this.personalServices.sendReportEmailAmazon(//sendEstimateEmailAmazon
    this.header.id, emailsName.trim(),this.comment,subjectTemp).then(data => {
    const resp: any = data;
    console.log('envio');
    console.log(resp);
  
    if(resp.status == 500){

      console.log('error');
    swal({
     title: 'Error al enviar el correo',
     text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres',
     type: 'error'
    });

   }
     
  }).catch(error => {
    console.log(error);
  });
}else if( this.masterEmail != '' &&  this.masterName != '' ){

  this.personalServices.sendReportEmailAmazon(//sendEstimateEmailAmazon
    this.header.id, emailsName.trim(),this.comment,subjectTemp).then(data => {
    const resp: any = data;
    console.log('envio');
    console.log(resp); 
    if(resp.status == 500){
      console.log('error');
      swal({
       title: 'Error al enviar el correo',
       text:'Por favor verificar que los archivos adjuntos no tengan caracteres especiales en los nombres',
       type: 'error'
      });
   }
  }).catch(error => {
    console.log(error);
  });
}else{
  swal({
    text:'Debe ingresar por lo menos un correo electrónico valido',
    type: 'error'
   });
}
 //este es el codigo para enviar el correo
 }


deleteFiles(item: any, i: number){
  console.log(item);
  console.log(i);
if(item.id){
    swal({
      title: 'Estás seguro de eliminar este elemento?',
     // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    })
    .then((willDelete) => {
        if (willDelete.value) {
          this.elementDelete = item;
          console.log(item);
          swal.showLoading();
          this.personalServices.deleteForkliftReportImage(Number(item.id))
          .then(data => {
            swal.showLoading();
            const resp: any = data;
            console.log('esta es la respuesta eliminando archivo'+JSON.stringify(resp));

            if (resp.success === false) {
              swal({
                title: 'Este archivo presenta problemas',
                text: 'Este archivo no se puede eliminar',
                type: 'error'
               });
            } else {
           // this.router.navigateByUrl('master/registerBrand');
          // this.ChangingValue();
           swal({
            title: 'Archivo eliminado',
            type: 'success'
           });
          }
         // swal.showLoading();
          this.urlsFiles.length = 0;
          this.getReportTechnicianImage();
          }).catch(error => {
            console.log(error);
          });
          console.log(item.id);
        } else {
         // swal('Fail');
        }
    });

  }else{
    this.urlsFiles.splice(i,1);
    console.log(this.urlsFiles.splice(i,1));
    var j = this.contFiles-i;
    console.log('este es valor de la posición de j: '+j);
    this.selectedFiles.splice(j,1);
  }
 }




generalAlert(title:string,text:string,type:any){
  swal({
    title:title,
    text:text,
    type:type
  })
}

  ngOnInit() {
  }




}
