import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BrandService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  updateCatalogueFile(id:number,brand: number, model:number, type: number) {
    console.log('info de detalle');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams = {
        brand_id: brand,
        model_id: model,
        type: type,
      };
      this.http.patch(this.apiEndPoint+'api/update_file_catalogue/'+id, patchParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
        console.log(data)
      }, error => {
        resolve(error);
        console.log(error)
      });
  });
}
  createCatalogueFile(brand: number, model:number,url: string, type: number, name:string) {
    console.log('info de detalle');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        brand_id: brand,
        model_id: model,
        url:url,
        type: type,
        name:name
      };
      this.http.post(this.apiEndPoint+'api/store_archive_catalogue', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}
  createCatalogue(brand: number, model:number) {
    console.log('info de detalle');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        brand_id: brand,
        model_id: model,
      };
      this.http.post(this.apiEndPoint+'api/store_archive_catalogue', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

  getCatalogueId(id: number){
    console.log(id);
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_catalogue_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }

  getCatalogueIdCount(id: number){
    console.log(id);
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_catalogue_id_count/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }

  getCatalogueFilter(model:any,brand:any){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_catalogue_filter?model='+model+'&brand='+brand, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }

  getCatalogue(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_catalogue', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }

  getCatalogueType(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_catalogue_type', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }

  getBrandModul(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_brand_modul', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
          resolve(error);
        });
    });
  }
  
  getBrandAll(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/get_all_brand', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  getModelAll(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/show_model_all', httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }
  

  getBrandId(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/show_brand_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  getModel(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      // console.log(id);
      this.http.get(this.apiEndPoint+'api/show_model/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }

  getValidateCatalogue(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      console.log(id);
      this.http.get(this.apiEndPoint+'api/get_validate_catalogue_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
        console.log(error);
                resolve(error);
        });
    });
  }
 
    storeBrand(description:any){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        description:description
      };
      console.log(postParams);
      
      this.http.post(this.apiEndPoint+'api/store_brand', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

    storeModel(brand: number,description:any){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        description:description,
        brand_id:brand
      };
      console.log(postParams);
      
      this.http.post(this.apiEndPoint+'api/store_model', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log("a mostrar data");
      console.log(data);
      resolve(data);
      }, error => {
        console.log("error en servicio");
                resolve(error);
        });
    });
  }

  updateBrand(id: number,description:string) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
      'Accept': 'application/json'
      })
    };
    console.log( localStorage.getItem('userid'));
    const patchParams = {
      description:description
    };
    console.log(patchParams);
    this.http.patch(this.apiEndPoint+'api/update_brand/'+id, patchParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
    });
  }

  updateModel(id: number,description:string,brand:number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
      'Accept': 'application/json'
      })
    };
    console.log( localStorage.getItem('userid'));
    const patchParams = {
      description:description,
      brand:brand
    };
    console.log(patchParams);
    this.http.patch(this.apiEndPoint+'api/update_model/'+id, patchParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
    });
  }

  deleteBrand( id:number){
    console.log('ole ole ole');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.delete(this.apiEndPoint+'api/destroy_brand/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteModel( id:number){
    console.log('ole ole ole');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.delete(this.apiEndPoint+'api/destroy_model/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteCatalogue( id:number){
    console.log('ole ole ole');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.delete(this.apiEndPoint+'api/delete_catalogue/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteFile( id:number){
    console.log('ole ole ole');
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user'))); // 'Bearer ' +
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.delete(this.apiEndPoint+'api/delete_file/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
}
