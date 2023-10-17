import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { BrandService } from '../../master-services/brand/brand.service';
import { UploadService } from '../../master-services/services/upload.service';

interface FileCatalogueInterface {
  id?: number;
  url?: string;
  name?: string;
  save?: boolean;
  part?: boolean;
  service?: boolean;
  file?:File;
}

@Component({
  selector: 'app-master-view-pdf-catalogue',
  templateUrl: './master-view-pdf-catalogue.component.html',
  styleUrls: ['./master-view-pdf-catalogue.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterViewPdfCatalogueComponent implements OnInit {

  fileCatalogue: FileCatalogueInterface;
  pdfUrl = "https://masterforklift.s3.amazonaws.com/catalogue/VISORMONTACARGASMASTER.pdf";
  selectedFiles: Array<File> = [];
  urlsFiles = [];
  
  submitted = false;
  rowsClient: any;
  elementDelete: any;

  currentFuel: any;

  topCss:number=29;
  topCssText:string='29%';

  selectedValueUpdate: any = 0;
  selectedValue: any = 0;
  selectedModel: any = 0;
  selectedModelUpdate: any = 0;
  selectedUpdate: any = 0;

  brands: any;
  model: any;
  type: any;
  s3info: any;
  catalogue: any;

  countFile = 0;
  base64: any;
  catalogueId: any;

  constructor(private brandService:BrandService, private router: Router, private uploadService: UploadService,
    private rutaActiva: ActivatedRoute) { 


    this.catalogueId = this.rutaActiva.snapshot.params.id;
    this.loadingData();
    this.loadingCatalogueId(this.catalogueId);
    console.log('importante el cambio de Issac');
  }

  ngOnInit() {
   
    this.viewFileBegin();
    // window.addEventListener("keyup", function (event) {
    //   console.log(event);
    //   event.preventDefault();
    //   return false;
    // },false);
  }

  loadingCatalogueId(id: number) {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.brandService.getCatalogueId(id).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      console.log(this.rowsClient);
      this.urlsFiles = [];
      this.topCss =29;  
      this.topCssText='29%';
      this.selectedValueUpdate = this.rowsClient.modelBrand.brand_contents_id;
      for(let item of this.rowsClient.data){
          let rep = false;
          let ser = false;
          if(item.type_catalogue_id==1){
            rep= true;
          }
          if(item.type_catalogue_id==2){
            ser= true;
          }
          this.fileCatalogue = {
            id:item.id,
            url: item.url,
            name: item.name_file,
            part:rep, 
            service:ser,  
            save:true  
          };
      
        this.urlsFiles.push(this.fileCatalogue); 
        this.topCss = this.topCss+4;  
        this.topCssText= this.topCss.toString()+'%';
      }
      this.loadingModelUpdate();
    }).catch(error => {
      console.log(error);
      swal({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar las marcas',
        type: 'error'
      });
    });
  }

  loadingCatalogueIdChange() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.brandService.getCatalogueId(this.selectedModelUpdate).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      console.log(this.rowsClient);
      this.urlsFiles = [];
      this.viewFileBegin();
      this.topCss =29;  
      this.topCssText='29%';
      this.selectedValueUpdate = this.rowsClient.modelBrand.brand_contents_id;
      for(let item of this.rowsClient.data){
          let rep = false;
          let ser = false;
          if(item.type_catalogue_id==1){
            rep= true;
          }
          if(item.type_catalogue_id==2){
            ser= true;
          }
          this.fileCatalogue = {
            id:item.id,
            url: item.url,
            name: item.name_file,
            part:rep, 
            service:ser,  
            save:true  
          };
      
        this.urlsFiles.push(this.fileCatalogue); 
        this.topCss = this.topCss+4;  
        this.topCssText= this.topCss.toString()+'%';
      }
    }).catch(error => {
      console.log(error);
      swal({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar las marcas',
        type: 'error'
      });
    });
  }

  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    // this.viewFileBegin();
    this.brandService.getBrandAll().then(data => {
      const resp: any = data;
      console.log('marcas');
      console.log(data);
      swal.close();
      this.brands = resp.data;
      this.rowsClient = resp.data;
      // this.rowStatic = resp.data;
      // this.rowsTemp = resp.data;
      console.log(this.brands);
    }).catch(error => {
      console.log(error);
      swal({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar las marcas',
        type: 'error'
      });
    });
  }


  loadingModelUpdate() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.brandService.getModel(this.selectedValueUpdate).then(data => {
      const resp: any = data;
      console.log('modelos');
      console.log(data);
      this.model = resp.data_models
      this.selectedModelUpdate = this.rowsClient.modelBrand.model_contents_id
      swal.close();

      // console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
      swal({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar los modelos',
        type: 'error'
      });
    });
  }
  loadingModelUpdateChange() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.urlsFiles = [];
    this.viewFileBegin();
    this.brandService.getModel(this.selectedValueUpdate).then(data => {
      const resp: any = data;
      console.log('modelos');
      console.log(data);
      this.model = resp.data_models

      swal.close();

      // console.log(this.rowsClient);
    }).catch(error => {
      console.log(error);
      swal({
        title: 'Falla al cargar la información',
        text: 'No se pudo cargar los modelos',
        type: 'error'
      });
    });
  }

  updateFuel(row) {
    this.urlsFiles = [];
    console.log(row);
    this.currentFuel = row;
    this.selectedValueUpdate = this.currentFuel.modelBrand.brand_contents_id;
    for(let item of this.currentFuel.data){
      let rep = false;
      let ser = false;
      if(item.type_catalogue_id==1){
        rep= true;
      }
      if(item.type_catalogue_id==2){
        ser= true;
      }
      this.fileCatalogue = {
        id:item.id,
        url: item.url,
        name: item.name_file,
        part:rep, 
        service:ser,  
        save:true  
      };
  
    this.urlsFiles.push(this.fileCatalogue); 
    this.topCss = this.topCss+4; 
    this.topCssText= this.topCss.toString()+'%'; 
  }

    this.loadingModelUpdate();
    document.getElementById('uploadBrand').click();
  }

  onChangeType(index: number,type:number, event){
    let even = event.target.checked;
    console.log(this.urlsFiles[index]);
    console.log(this.urlsFiles[index].part);
    // console.log(index);
    if(even==true && type==1){
         this.urlsFiles[index].service == true ?  this.urlsFiles[index].service=false:this.urlsFiles[index].service=false;  
    }
    if(even==true && type==2){
         this.urlsFiles[index].part == true ?  this.urlsFiles[index].part=false:this.urlsFiles[index].part=false;  
    }
  }

  onSelectFile(event) {
    let filesAmount = []
    filesAmount = event.target.files;
    console.log(filesAmount);
    
    for (let item of filesAmount){

      let filename = item.name;
      console.log('Nombre de archivo');
      console.log(filename);
  
        this.fileCatalogue = {
          id:0,
          name: filename,
          part:false, 
          service:false,  
          file:item, 
          save:false  
        };
    
      this.urlsFiles.push(this.fileCatalogue); 
      this.topCss = this.topCss+4;  
      this.topCssText= this.topCss.toString()+'%';
      // this.selectedFiles.push(['files'=>item,]);
    }
  }

  uploadFilesUpdate() {
    let count = 0;
    for(let item of this.urlsFiles){
      if(item.save){
        count ++;
      }
    } 

    if(count == this.urlsFiles.length){
      swal({
        type: 'error',
        title: 'Sin Archivos',
        text: 'No hay archivos nuevos por montar.',
      });
    }else{
      if(this.selectedValueUpdate !== 0 && this.selectedModelUpdate != 0){
        if(this.urlsFiles.length > 0){
          swal({
            title: 'Validando información ...',
            allowOutsideClick: false
          });
          swal.showLoading();
          for (let fileCurrent of this.urlsFiles) {
  
            const file = fileCurrent.name;
            console.log(file);
            let type;
            if(fileCurrent.part){
              type = 1;
            }
            if(fileCurrent.service){
              type = 2;
            }
  
            let  nameTemp;
            if(!fileCurrent.save){
              nameTemp = this.removeAccents(this.normalizes(file.replace(/\s/g, "")));
            }
            this.uploadService.uploadFilesCatalogue(fileCurrent, this.selectedValueUpdate,this.selectedModelUpdate,type, nameTemp).then(res => {
              console.log(res);
              this.s3info = res;
              console.log(this.s3info);
              this.loadingCatalogueId(this.catalogueId);
              swal({
                title: 'Archivos guardados',
                type: 'success'
               });
              swal.close();
            }).catch(error => {
              console.log(error);
              swal({
                type: 'error',
                title: 'Oops a currido un error',
                text: 'Se ha presentado un error al subir la imagen',
                allowOutsideClick: false
              });
            });
          }
        }else{
          swal({
            type: 'error',
            title: 'Sin arvhivos',
            text: 'No se ha seleccionado ningun archivo para montar',
          });
        }
      }else{
        swal({
          type: 'error',
          title: 'Falta información',
          text: 'Por favor escoja cada una de las opciones.',
        });
      }
    }
    
  }

  uploadFiles() {
    if(this.selectedValue !== 0 && this.selectedModel != 0){
      if(this.urlsFiles.length > 0){
        swal({
          title: 'Validando información ...',
          allowOutsideClick: false
        });
        swal.showLoading();
        for (let fileCurrent of this.urlsFiles) {
          const file = fileCurrent.file;
          console.log(file);
          let type;
          if(fileCurrent.part){
            type = 1;
          }
          if(fileCurrent.service){
            type = 2;
          }
          //  const uuid = UUID.UUID();
          // console.log(uuid);
          // console.log(file.name + '.' + file.type);
          let  nameTemp;
          if(!fileCurrent.save){
            nameTemp = this.removeAccents(this.normalizes(file.url.replace(/\s/g, "")));
          }
          this.uploadService.uploadFilesCatalogue(fileCurrent, this.selectedValue.id,this.selectedModel.id,type, nameTemp).then(res => {
            console.log(res);
            this.s3info = res;
            console.log(this.s3info);

            swal({
              title: 'Archivos guardados',
              type: 'success'
             });

             document.getElementById('createBrandHide').click();
            swal.close();
          }).catch(error => {
            console.log(error);
            swal({
              type: 'error',
              title: 'Oops a currido un error',
              text: 'Se ha presentado un error al subir la imagen',
              allowOutsideClick: false
            });
          });
        }
      }else{
        swal({
          type: 'error',
          title: 'Sin arvhivos',
          text: 'No se ha seleccionado ningun archivo para montar',
        });
      }
    }else{
      swal({
        type: 'error',
        title: 'Falta información',
        text: 'Por favor escoja cada una de las opciones.',
      });
    }
  }

  deleteFile(index:number,item: any){
    swal({
      title: 'Estás seguro de eliminar este elemento?',
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si'

    }).then((willDelete) => {
      if (willDelete.value) {
        if(item.save){
          this.elementDelete = item;
          console.log(item);
          console.log(this.elementDelete);
          swal.showLoading();
          
          this.brandService.deleteFile(Number(this.elementDelete.id))
            .then(data => {
              swal.showLoading();
              const resp: any = data;
              console.log(resp);
  
              if (resp.success === false) {
                swal({
                  title: 'Este archivo presenta problemas',
                  text: 'Este archivo no se puede eliminar',
                  type: 'error'
                });
              } else {
                // this.router.navigateByUrl('master/registerBrand');
                this.urlsFiles.splice(index, 1);
                this.topCss = this.topCss-4;  
                this.topCssText= this.topCss.toString()+'%';

                swal({
                  title: 'Archivo eliminado',
                  type: 'success'
                });
              }
            }).catch(error => {
              console.log(error);
            });
          console.log(this.elementDelete.id);
        }else{
          this.urlsFiles.splice(index, 1);
          this.topCss = this.topCss-4; 
          this.topCssText= this.topCss.toString()+'%';

        }
      
        
      } else {
        // swal('Fail');
      }
      console.log(willDelete);
    });
  }


  viewFileBegin(){
   
    this.base64 =this.pdfUrl+'#toolbar=0';
    let div = document.getElementById('viewFiles');
    div.innerHTML =("<embed   width='100%' height='800px' oncontextmenu='return false'  onselectstart='return false' ondragstart='return false'   src= '"+this.base64+"'>"); 
  }

  viewFile(row){
    console.log(row);
    this.base64 = row.url+'#toolbar=0';
    let div = document.getElementById('viewFiles');
    div.innerHTML =("  <embed   width='100%' height='800px' oncontextmenu='return false'  onselectstart='return false' ondragstart='return false'   src= '"+this.base64+"'>   "); 
  }

  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  normalizes = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç$#+*%&!¡¿?|¬",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
      mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
      var ret = [];
      for (var i = 0, j = str.length; i < j; i++) {
        var c = str.charAt(i);
        if (mapping.hasOwnProperty(str.charAt(i)))
          ret.push(mapping[c]);
        else
          ret.push(c);
      }
      return ret.join('');
    }

  })();

  toBack(){
    this.router.navigateByUrl('maintenance/brandModelContents');
  }
 

}
