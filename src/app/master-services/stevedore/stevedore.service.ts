import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class StevedoreService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getStevedore(){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      
      this.http.get(this.apiEndPoint+'api/get_stevedore', httpOptions)
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
  getStevedoreForklist(id: number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      
      this.http.get(this.apiEndPoint+'api/show_stevedore/'+id, httpOptions)
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

  getStevedoreId(id: number) { // Falta implementar desde el backend
    console.log(id)
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
      this.http.get(this.apiEndPoint+'api/get_stevedore_id/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  storeStevedore(description:string,hours:number,observation:string, supplice_part:number, delivery_review:number,
    pending:number, survey:number, firm:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams={
        description:description,
        hours:hours,
        observation:observation,
        supplice_part:supplice_part,
        delivery_review:delivery_review,
        pending:pending,
        survey:survey,
        firm:firm
      }
      console.log(postParams);
      this.http.post(this.apiEndPoint+'api/create_stevedore', postParams,httpOptions)
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
  updateStevedore(id:number,description:string,hours:number,observation:string, supplice_part:number, delivery_review:number,
    pending:number, survey:number, firm:number){
    console.log("data to send");
    console.log("id "+id);
    console.log("description "+description);
    console.log("hours "+hours);
    console.log("observation "+observation);
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const patchParams={
        description:description,
        hours:hours,
        observation:observation,
        supplice_part:supplice_part,
        delivery_review:delivery_review,
        pending:pending,
        survey:survey,
        firm:firm
      }
      console.log(patchParams);
      this.http.patch(this.apiEndPoint+'api/stevedore_update/'+id, patchParams,httpOptions)
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

  deleteStevedore(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      
      this.http.delete(this.apiEndPoint+'api/stevedore_destroy/'+id, httpOptions)
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

  createSystem(stevedore_id: number, description: string) {
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
      stevedore_id: stevedore_id,
      description: description,
    };
    this.http.post(this.apiEndPoint+'api/create_system_stevedore', postParams, httpOptions)
    .map(res => res).subscribe(data => {
      console.log(data);
      resolve(data);
      }, error => {
      resolve(error);
      });
    });
  }
  
  
  getSystemId(id: number) { // Falta implementar desde el backend
    console.log(id)
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
      this.http.get(this.apiEndPoint+'api/get_system_id/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  
  updateSystem(id: number, description: string) {
    console.log(id + ',' + description );
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
        description: description,
      };
      this.http.patch(this.apiEndPoint+'api/update_system_stevedore/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          console.log(error);
          resolve(error);
        });
    });
  }
  
  deleteSystem(id: number) {
    console.log('ole ole ole');
    console.log(id);
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
      };
      this.http.delete(this.apiEndPoint+'api/delete_system_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data)
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
   
  
  createPart(system_stevedore_id: number, description: string) {
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
      system_stevedore_id: system_stevedore_id,
      part_description: description,
    };
    console.log(postParams);
    this.http.post(this.apiEndPoint+'api/create_stevedore_part?', postParams, httpOptions)
    .map(res => res).subscribe(data => {
      console.log(data);
      resolve(data);
      }, error => {
      resolve(error);
      });
    });
  }
  
  getPartId(id: number) { // Falta implementar desde el backend
    console.log(id)
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
      this.http.get(this.apiEndPoint+'api/get_part_id/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  
  updatePart(id: number, description: string) {
    console.log(id + ',' + description );
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
        part_description: description,
      };
      this.http.patch(this.apiEndPoint+'api/update_part_stevedore/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          console.log(error);
          resolve(error);
        });
    });
  }
  
  deletePart(id: number) {
    console.log('ole ole ole');
    console.log(id);
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
      };
      this.http.delete(this.apiEndPoint+'api/delete_part_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data)
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getStevedoreDetails(id:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      
      this.http.get(this.apiEndPoint+'api/get_stevedor_details/'+id, httpOptions)
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

  
  showStevedoreConsecutive() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/get_stevedore_consecutive', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateConsecutiveStevedore() {
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
      };
      this.http.patch(this.apiEndPoint+'api/update_stevedore_consecutive',postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteStevedoreTechnician(id:number, stevadore:string, technician:string){
    console.log('ole ole ole');
    console.log(id);
    console.log(stevadore);
    console.log(technician);
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
      };
      console.log('id='+id+'&stevadores='+stevadore+'&technicians_id='+technician);
      this.http.delete(this.apiEndPoint+'api/delete_stevedore?stevedores='+stevadore+'&technicians_id='+technician, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  
  storeStevedoreTechnician(customer_id:number,brach_id:number,id_rutines:string,technician_id: any, consecutive:number, date:string, type:number){
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        customer_id: customer_id,
        branch_id: brach_id,
        stevedores: id_rutines,
        technicians_id: technician_id,
        consecutive: consecutive,
        date: date,
        type: type
      };
      console.log(postParams);
      
      this.http.post(this.apiEndPoint+'api/store_stevedore_techinician', postParams, httpOptions)
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

  updateStevedoreTechnician(customer_id:number,branch_id:number,id_rutines:string,technician_id: any,date: string,newDate: string,consecutive:number,type:number) {
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
        customer_id:customer_id,
        branch_offices_id:branch_id,
        stevedores: id_rutines,
        technicians_id: technician_id,
        date: date,
        newDate: newDate,
        consecutive:consecutive,
        type:type
    };
    console.log(patchParams);
    this.http.patch(this.apiEndPoint+'api/update_stevedore_techinician', patchParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
    });
  }


}

