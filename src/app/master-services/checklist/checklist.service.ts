import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { identifierName } from '@angular/compiler';

@Injectable()
export class ChecklistService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

createChecklist( description: string, hours: number, observation: string,type:number,customer_id: string, regional_id: string) {
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
      hours: hours,
      observation: observation,
      regional_id:regional_id,
      customer_id:customer_id,
      type:type,
    };
    console.log(postParams);
    this.http.post(this.apiEndPoint+'api/create_checklist?', postParams, httpOptions)
    .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
      });
    });
}

showChecklist() { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/show_all_checklists', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

showChecklistFilter(regional_id: any, customer_id: any){
  return new Promise(resolve => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
        'Accept': 'application/json'
      })
    };
    console.log('regional_id='+regional_id+'&customer_id='+customer_id);
    this.http.get(this.apiEndPoint+'api/show_filter_checklist?regional_id='+regional_id+'&customer_id='+customer_id, httpOptions)
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
getChecklistId(id: number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_checklist_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateChecklist(id: number,description: string, hours: number, observation: string, type: number, customer_id: string, regional_id:string) {
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
      hours:hours,
      observation:observation,
      regional_id:regional_id,
      customer_id:customer_id,
      type:type,
    };
    this.http.patch(this.apiEndPoint+'api/update_checklist/' + id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        resolve(error);
      });
  });
}

deleteChecklist(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_checklists_id/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}
 
createComponent(checklists_id: number, description: string) {
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
    checklists_id: checklists_id,
    description: description,
  };
  this.http.post(this.apiEndPoint+'api/create_checklist_component', postParams, httpOptions)
  .map(res => res).subscribe(data => {
    console.log(data);
    resolve(data);
    }, error => {
    resolve(error);
    });
  });
}


getComponentId(id: number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_component_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateComponets(id: number, description: string) {
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
    this.http.patch(this.apiEndPoint+'api/update_component_checklist/' + id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        resolve(error);
      });
  });
}

deleteComponent(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/checklist_delete_component_id/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}
 

createPart(components_checklist_id: number, description: string) {
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
    components_checklist_id: components_checklist_id,
    description: description,
  };
  console.log(postParams);
  this.http.post(this.apiEndPoint+'api/checklist_create_checklist_part?', postParams, httpOptions)
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
    this.http.get(this.apiEndPoint+'api/checklist_get_part_id/'+id, httpOptions)
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
      description: description,
    };
    this.http.patch(this.apiEndPoint+'api/checklist_update_part/' + id, postParams, httpOptions)
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
    this.http.delete(this.apiEndPoint+'api/checklist_delete_part_id/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

createSecutity(checklists_id: number, description: string) {
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
    checklists_id: checklists_id,
    description: description,
  };
  this.http.post(this.apiEndPoint+'api/create_checklist_security?', postParams, httpOptions)
  .map(res => res).subscribe(data => {
    console.log(data);
    resolve(data);
    }, error => {
    resolve(error);
    });
  });
}

getSecurityId(id: number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_security_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateSecurity(id: number, description: string) {
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
    this.http.patch(this.apiEndPoint+'api/update_security/' + id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        resolve(error);
      });
  });
}

getChecklistDetails(id:number){
  return new Promise(resolve => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
        'Accept': 'application/json'
      })
    };
    
    this.http.get(this.apiEndPoint+'api/get_checklist_details/'+id, httpOptions)
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

deleteSecurity(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_security_id/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}
}
