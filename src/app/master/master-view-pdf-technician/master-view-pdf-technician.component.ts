import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { BrandService } from '../../master-services/brand/brand.service';
import { ForkliftService } from '../../master-services/Forklift/forklift.service';
import { RestService } from '../../master-services/Rest/rest.service';
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
  selector: 'app-master-view-pdf-technician',
  templateUrl: './master-view-pdf-technician.component.html',
  styleUrls: ['./master-view-pdf-technician.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss']
})
export class MasterViewPdfTechnicianComponent implements OnInit {

  fileCatalogue: FileCatalogueInterface;

  urlsFiles = [];
  pdfUrl = "https://masterforklift.s3.amazonaws.com/catalogue/VISORMONTACARGASMASTER.pdf";  
  rowsClient: any;


  selectedValueUpdate: any = 0;

  brands: any;
  model: any;

  base64: any = "";

  selectedBusinessId: any = 0;
  selectedOfficeId: any = 0;

  topCss:number=25;
  topCssText:string='25%';

  constructor(private restService: RestService,private brandService:BrandService, private router: Router, private uploadService: UploadService,
    private forkliftService: ForkliftService, ) {

    this.loadingData();
    // this.viewFileBegin();

  }

  loadingData() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();

    this.brandService.getBrandAll().then(data => {
      const resp: any = data;
      console.log('marcas');
      console.log(data);
      swal.close();
      this.brands = resp.data;
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

  loadingModel() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.urlsFiles = [];
    this.viewFileBegin();
    this.brandService.getModel(this.selectedBusinessId).then(data => {
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


  loadingCatalogueId() {
    swal({
      title: 'Validando información ...',
      allowOutsideClick: false
    });
    swal.showLoading();
    this.brandService.getCatalogueId(this.selectedOfficeId).then(data => {
      const resp: any = data;
      console.log(data);
      swal.close();
      this.rowsClient = resp.data;
      console.log(this.rowsClient);
      this.topCss =25;  
      this.topCssText='25%';
      this.urlsFiles = [];
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
        text: 'No se pudo cargar los archivos',
        type: 'error'
      });
    });
  }

  viewFileBegin(){
    console.log('entro');
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

  onRightClick(){
    console.log('entro');
    // function click(){
    //   if(event.button==2){
        return false;
    //   }
    // }
    // document.onmousedown=click

    // let div = document.getElementById('viewFiles');
    // div.addEventListener('contextmenu', e => e.preventDefault())
  }


  toBack(){
    this.router.navigateByUrl('maintenance/brandModelContents');
  }
  ngOnInit() {
    this.viewFileBegin();
  }

}
