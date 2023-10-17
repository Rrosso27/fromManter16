import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
@Injectable()
export class RestService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }


  getUser() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }


  createUserInternal(firstName: string,
    lastName: string,
    name: string,
    username: string,
    cellphone: string,
    telephone: string,
    password: string,
    rpassword: string,
    email: string,
    profileId: number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      const postParams = {
        first_name: firstName,
        last_name: lastName,
        name: name,
        cellphone: cellphone,
        telephone: telephone,
        email: email,
        password: password,
        c_password: rpassword,
        username: username,
        profile_id: profileId
      };
      this.http.post(this.apiEndPoint + 'api/auth/signup', postParams)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          console.log('error al registro');
          resolve(error);
        });
    });
  }

  createRelationshipUserOffices(id_user: number,
    ids_branch_offices: Array<number>,
    id_customer: number) {
    console.log(id_user);
    console.log(ids_branch_offices);
    console.log(id_customer);
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
        id_user: id_user,
        ids_branch_offices: ids_branch_offices,
        id_customer: id_customer
      };
      this.http.post(this.apiEndPoint + 'api/branch_offices_users', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          console.log('error al registro');
          resolve(error);
        });
    });
  }

  getRelationshipUserOffices(idUser: Number) {
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
      this.http.get(this.apiEndPoint + 'api/branch_offices_users?id_user=' + idUser, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createBrand(description: string, status: number) {
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
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/brands', postParams, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  updateBrand(id: number, description: string, status: number) {
    console.log('ole ole ole');
    console.log(status);
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
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/brands/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteBrand(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/brands/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteOffice(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/branch_offices/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  filter(seeker: any) {
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
      this.http.get(this.apiEndPoint + 'api/filter?input=' + seeker, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createCustomer(business_name: string,
    type_document_id: number,
    document_id: number,
    telephone: string,
    address: string,
    status: number,
    margin_price: number,
    payment_condition_id: number,
    city_id: number,
    department_id: number) {
    console.log(business_name + ',' + type_document_id + ',' + document_id + ',' + telephone +
      ',' + address + ',' + status + ',' + margin_price + ',' + payment_condition_id + ',' + city_id + ',' + department_id);
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
        business_name: business_name,
        type_document_id: type_document_id,
        document_id: document_id,
        telephone: telephone,
        address: address,
        status: status,
        price_margin: margin_price,
        payment_condition_id: payment_condition_id,
        city_id: city_id,
        department_id: department_id
      };
      this.http.post(this.apiEndPoint + 'api/customers ', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createCustomerNewCustomer(business_name: string,
    type_document_id: number,
    document_id: number,
    telephone: string,
    address: string,
    status: number,
    margin_price: number,
    payment_condition_id: number,
    city_id: number,
    department_id: number,
    regional_id: number) {
    console.log(business_name + ',' + type_document_id + ',' + document_id + ',' + telephone +
      ',' + address + ',' + status + ',' + margin_price + ',' + payment_condition_id + ',' + city_id + ',' + department_id + ',' + regional_id);
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
        business_name: business_name,
        type_document_id: type_document_id,
        document_id: document_id,
        telephone: telephone,
        address: address,
        status: status,
        price_margin: margin_price,
        payment_condition_id: payment_condition_id,
        city_id: city_id,
        department_id: department_id,
        regional_id: regional_id
      };
      this.http.post(this.apiEndPoint + 'api/create_customer_new_regional', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  updateCustomer(id: number, business_name: string,
    type_document_id: number,
    document_id: number,
    telephone: string,
    address: string,
    status: number,
    margin_price: number,
    payment_condition_id: number,
    city_id: number,
    department_id: number) {
    console.log(id + ',' + business_name + ',' + type_document_id + ',' + document_id + ',' + telephone +
      ',' + address + ',' + status + ',' + margin_price + ',' + payment_condition_id + ',' + city_id + ',' + department_id);
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
        business_name: business_name,
        type_document_id: type_document_id,
        document_id: document_id,
        telephone: telephone,
        address: address,
        status: status,
        price_margin: margin_price,
        payment_condition_id: payment_condition_id,
        city_id: city_id,
        department_id: department_id
      };
      this.http.patch(this.apiEndPoint + 'api/customers/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          console.log(error);
          resolve(error);
        });
    });
  }

  deleteCustomer(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/customers/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createforklift(serie: string,
    customer_id: number,
    branch_offices_id: number,
    description: string,
    status: number,
    brand_id: number,
    model_id: number,
    machine_id: number,
    tyre_id: number,
    tyre_forward: string,
    tyre_sback: string,
    fuel_id: number,
    routine_id: number,
    tonne: number,
    mastil_izado: number,
    mastil_contract: number,
    h_initial: number,
    h_current: number,
    alarm: number,
    observation: string,
    user_id: any,
    status_own: number
  ) {
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
        /* serie: serie,
         customer_id: customer_id,
         branch_offices_id: branch_offices_id,
         description: description,
         brand_id: brand_id,
         status: status,
         model_id: model_id,
         machine_id: machine_id,
         tyre_id: tyre_id,
         fuel_id: fuel_id*/

        serie: serie,
        customer_id: customer_id,
        branch_offices_id: branch_offices_id,
        description: description,
        status: status,
        brand_id: brand_id,
        model_id: model_id,
        machine_id: machine_id,
        tyre_id: tyre_id,
        tyre_forward: tyre_forward,
        tyre_sback: tyre_sback,
        fuel_id: fuel_id,
        routine_id: routine_id,
        tonne: tonne,
        mastil_izado: mastil_izado,
        mastil_contract: mastil_contract,
        h_initial: h_initial,
        h_current: h_current,
        alarm: alarm,
        observation: observation,
        user_id: user_id,
        status_own: status_own
      };
      console.log('tonne-----------' + tonne);
      this.http.post(this.apiEndPoint + 'api/forklifts', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateforklift(idForlift: number,
    serie: string,
    customer_id: number,
    branch_offices_id: number,
    description: string,
    status: number,
    brand_id: number,
    model_id: number,
    machine_id: number,
    tyre_id: number,
    tyre_forward: string,
    tyre_sback: string,
    fuel_id: number,
    routine_id: number,
    tonne: number,
    mastil_izado: number,
    mastil_contract: number,
    h_initial: number,
    h_current: number,
    alarm: number,
    observation: string,
    user_id: any,
    status_own: number
  ) {
    console.log('Este es el numero de estado');
    console.log(status_own);

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
        /* serie: serie,
         customer_id: customer_id,
         branch_offices_id: branch_offices_id,
         description: description,
         brand_id: brand_id,
         status: status,
         model_id: model_id,
         machine_id: machine_id,
         tyre_id: tyre_id,
         fuel_id: fuel_id*/

        serie: serie,
        customer_id: customer_id,
        branch_offices_id: branch_offices_id,
        description: description,
        status: status,
        brand_id: brand_id,
        model_id: model_id,
        machine_id: machine_id,
        tyre_id: tyre_id,
        tyre_forward: tyre_forward,
        tyre_sback: tyre_sback,
        fuel_id: fuel_id,
        routine_id: routine_id,
        tonne: tonne,
        mastil_izado: mastil_izado,
        mastil_contract: mastil_contract,
        h_initial: h_initial,
        h_current: h_current,
        alarm: alarm,
        observation: observation,
        user_id: user_id,
        status_own: status_own
      };
      this.http.patch(this.apiEndPoint + 'api/forklifts/' + idForlift, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createTyre(description: string, status: number) {
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
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/tyres', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateTyre(id: number, description: string, status: number) {
    console.log('ole ole ole');
    console.log(status);
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
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/tyres/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteTyre(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/tyres/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createModel(description: string, brand: number, status: number) {
    console.log(description + ',' + brand + ',' + status);
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
        brand_id: brand,
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/models', postParams, httpOptions)
        .map(res => res).subscribe(data => {

          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateModel(id: number, description: string, brand: number, status: number) {
    console.log(id + ',' + description + ',' + brand + ',' + status);
    console.log(status);
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
        description: description,
        brand_id: brand,
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/models/' + id, patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createFuel(description: string, type: string, status: number) {
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
        type: type,
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/fuels', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateFuel(id: number, description: string, type: string, status: number) {
    console.log(id + ',' + description + ',' + type + ',' + status);
    console.log(status);
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
        type: type,
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/fuels/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteFuel(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/fuels/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteModel(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/models/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createMachine(description: string, status: number) {
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
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/machines', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  updateMachine(id: number, description: string, status: number) {
    console.log('ole ole ole');
    if (!status) {
      status = 0;
    }
    console.log('id:' + id + "desc:" + description + "status:" + status);
    console.log(localStorage.getItem('token_user'));
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
        description: description,
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/machines/' + id, patchParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          console.log('error en el servicio');
          resolve(error);
        });
    });
  }
  deleteMachine(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/machines/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createPayCondition(description: string, day: number, status: number) {
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
        day: day,
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/payment_conditions', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updatePayCondition(id: number, description: string, day: number, status: number) {
    console.log('ole ole ole');
    console.log(status);
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
        day: day,
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/payment_conditions/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deletePayCondition(id: number) {
    console.log('ole ole ole');
    console.log(status);
    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.delete(this.apiEndPoint + 'api/payment_conditions/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log("mostrar data");
          console.log(data);
          resolve(data);
        }, error => {
          console.log("error en el servicio");
          resolve(error);
        });
    });
  }


  // --------
  getTypeDocuments() {
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
      this.http.get(this.apiEndPoint + 'api/type_documents', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createTypeDocument(description: string, status: number) {
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
        status: status
      };
      this.http.post(this.apiEndPoint + 'api/type_documents', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          console.log("datos");
          console.log(data);
          resolve(data);
        }, error => {
          console.log("error en el servicio");
          resolve(error);
        });
    });
  }

  updateTypeDocument(id: number, description: string, status: number) {
    console.log('ole ole ole');
    console.log(status);
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
        status: status
      };
      this.http.patch(this.apiEndPoint + 'api/type_documents/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  deleteTypeDocument(id: number) {
    console.log('ole ole ole');
    console.log(status);
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
      this.http.delete(this.apiEndPoint + 'api/type_documents/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getDepartments() {
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
      this.http.get(this.apiEndPoint + 'api/departments', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getCities(idDepartamento: number) {
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
      this.http.get(this.apiEndPoint + 'api/cities/' + idDepartamento, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }






  getPriceList() {
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
      this.http.get(this.apiEndPoint + 'api/price_list', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  // -----------
  getBrands() {
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
      this.http.get(this.apiEndPoint + 'api/brands', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getFuels() {
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
      this.http.get(this.apiEndPoint + 'api/fuels', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getTyres() {
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
      this.http.get(this.apiEndPoint + 'api/tyres', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getModels() {
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
      this.http.get(this.apiEndPoint + 'api/models', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }




  getBrandModels(id: number) {
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
      this.http.get(this.apiEndPoint + 'api/brands_model/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  // --------------------------

  getPaymentConditions() {
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
      this.http.get(this.apiEndPoint + 'api/payment_conditions', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  // ------

  getMachines() {
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
      this.http.get(this.apiEndPoint + 'api/machines', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  generateToken(email: string,
    password: string) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };
      //  let options = new RequestOptions({ headers: headers });

      const postParams = {
        grant_type: 'password',
        client_id: '1',
        client_secret: 'TyG8pFzcGI7nTIt31FzFCwnvF0E8t70OSAIyrwWT',
        username: email,
        password: password,
        scope: '*'
      };
      //  alert (postParams.toString());



      this.http.post(this.apiEndPoint + 'oauth/token', postParams)
        .map(res => res)
        .subscribe(data => {
          const ole = data;
          console.log('respuesta: ' + JSON.stringify(ole));
          resolve(data);
        }, error => {
          alert(error);
          console.log(error);
        });
    });
  }

  getMastersThird() {
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
      this.http.get(this.apiEndPoint + 'api/show_masters', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  //---------------------------------------------------------------------------Cost center
  getSpecificCostCenter(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.get(this.apiEndPoint + 'api/get_cost_centers_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updatCostCenters(id: number, description: string, code: string, regional: number) {

    console.log("en servicio");
    console.log(id);
    console.log(description);
    console.log(code);
    console.log(regional);

    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        id: id,
        description: description,
        code: code,
        regionals_id: regional
      };
      this.http.patch(this.apiEndPoint + 'api/update_cost_centers/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  deleteCostCenter(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_cost_centers_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createCostCenter(description: string, code: string, regional_id: number) {
    console.log('ole ole ole');
    console.log(description + ', ' + code + ', ' + regional_id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        regionals_id: regional_id,
        code: code,
        description: description
      };
      this.http.post(this.apiEndPoint + 'api/create_cost_centers', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getCostCenterSettlement(idRegional: number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_cost_centers_regionals_id?idRegional=' + idRegional, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getCostCenter() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_cost_centers', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegionalCostCenter() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_cost_centers_regionals_id', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  //----------------------------------------------------------------------------Technicians
  getMastersTechnicians() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_masters', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getSpecificTechnician(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.get(this.apiEndPoint + 'api/get_technicians_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createTechnicians(name: string, document: string, cellphone: string) {
    console.log('ole ole ole');
    console.log(name + ', ' + document + ', ' + cellphone);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        name: name,
        document: document,
        cellphone: cellphone
      };
      this.http.post(this.apiEndPoint + 'api/create_technicians', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateTechnian(id: number, name: string, document: string, cellphone: string) {
    console.log("en servicio");
    console.log(id);
    console.log(document);
    console.log(cellphone);

    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        id: id,
        name: name,
        document: document,
        cellphone: cellphone,
      };
      this.http.patch(this.apiEndPoint + 'api/update_technicians/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteTechnician(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_technicians_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getTechnicians() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_technicians', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  //-------------------------------------------------------------------------Regional
  getSpecificRegional(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.get(this.apiEndPoint + 'api/get_regioanl_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createRegional(description: string, code: string, name: string, email: string) {
    console.log('ole ole ole');
    console.log(description + ', ' + code);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        code: code,
        description: description,
        name: name,
        email: email
      };
      console.log(postParams)
      this.http.post(this.apiEndPoint + 'api/create_regionals', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateRegional(id: number, description: string, code: string, name: string, email: string) {
    console.log("en servicio");
    console.log(id);
    console.log(description);
    console.log(code);

    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        code: code,
        description: description,
        name: name,
        email: email
      };
      this.http.patch(this.apiEndPoint + 'api/update_regional/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteRegional(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_regionals_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegional() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_regionals_all', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegionalAll() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_regionals_all', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegionalCustomer(idCustomer: number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_customer_regionals_id?idCustomer=' + idCustomer, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });

  }

  //---------------------------------------------------------------------SubCostCentrt
  createSubCostCenter(description: string, code: string, costCenter_id: number) {
    console.log('ole ole ole');
    console.log(description + ', ' + code);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        code: code,
        description: description,
        regional_id: costCenter_id
      };
      this.http.post(this.apiEndPoint + 'api/create_sub_cost_centers', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updatSubCostCenters(id: number, description: string, code: string, costCenter: number) {

    console.log("en servicio");
    console.log(id);
    console.log(description);
    console.log(code);
    console.log(costCenter);

    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        id: id,
        description: description,
        code: code,
        regional_id: costCenter
      };
      console.log(postParams);
      this.http.patch(this.apiEndPoint + 'api/update_sub_cost_centers/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteSubCostCenter(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_sub_cost_centers_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getSubCostCenter() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_sub_cost_centers', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  getSubCostCenterFilter(input:any) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.post(this.apiEndPoint + 'api/show_SubCost_Centers_Filter?input='+ input, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  showSubCostCentersFilter() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/showSubCostCentersFilter', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  //---------------------------------------------------------------Warehouses
  createWarehouses(description: string, code: string, regional_id: number) {
    console.log('ole ole ole');
    console.log(description + ', ' + code + ', ' + regional_id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        code: code,
        description: description,
        regionals_id: regional_id
      };
      console.log(postParams);
      this.http.post(this.apiEndPoint + 'api/create_warehouses', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updatWarehouses(id: number, description: string, code: string, regional: number) {

    console.log("en servicio");
    console.log(id);
    console.log(description);
    console.log(code);
    console.log(regional);

    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        id: id,
        description: description,
        code: code,
        regionals_id: regional
      };
      this.http.patch(this.apiEndPoint + 'api/update_warehouses/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteWarehouses(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_warehouses_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getWarehouses() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_warehouses', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getWarehousesSettlement(regionalId: number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_warehouses_regional_id?idRegional=' + regionalId, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  //---------------------------------------------------------------CustomerRegional

  customerRegionalSelect(details: string) {
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
        regional: details
      };
      this.http.post(this.apiEndPoint + 'api/create_customer_regionals', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegionalId(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.get(this.apiEndPoint + 'api/get_customer_regionals_id?idCustomer=' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  //---------------------------------------------------------------Rest salidas
  getCustomers() {
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
      this.http.get(this.apiEndPoint + 'api/get_customer', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  // Llenar información de cliente
  getOffice(idCustomer: number) {
    console.log(idCustomer);
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
      this.http.get(this.apiEndPoint + 'api/get_branch_office/' + idCustomer, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getOfficeWithRegional(idCustomer: number, regional_id: number) {
    console.log(idCustomer);
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
      this.http.get(this.apiEndPoint + 'api/get_branch_office_regional?customer_id=' + idCustomer + '&regional_id=' + regional_id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getForkLift(idOffice: number) {
    console.log(idOffice)
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
      this.http.get(this.apiEndPoint + 'api/get_fork_lift/' + idOffice, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getTechnician() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_user_technician', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }
  getUserRegional(regional: number, customer: number) {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_user_technician_regional?regional=' + regional + '&customer=' + customer, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getReferences() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_reference_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getDescriptions() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_description_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getControls() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_control_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getEstimates() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_order_number_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getSettlements() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_settlement_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getInvoices() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/show_invoice_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showWarehouseOutFilter(paramsFilter: string) {
    console.log(paramsFilter)
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
      this.http.get(this.apiEndPoint + 'api/get_show_warehouse_out?' + paramsFilter, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  createWarehousesOut(idCustomer, idTechnician, idBranchOffice, quantity, reference, description, control, unitCost,
    total, forkliftText, ordenNumber, comsumtion, observation) {
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
        customer_id: idCustomer,
        technician_id: idTechnician,
        branch_office_id: idBranchOffice,
        quantity: quantity,
        reference: reference,
        description: description,
        control: control,
        unit_cost: unitCost,
        total: total,
        forklift_text: forkliftText,
        //forklift_id: forkliftId,
        orden_number: ordenNumber,
        // settlement_text: settlementText,
        //invoice_text: invoiceText,
        comsumtion: comsumtion,
        observation: observation,

      };
      this.http.post(this.apiEndPoint + 'api/create_warehouses_out', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateWarehouseOut(id, idCustomer, idTechnician, idBranchOffice, quantity, reference, description, control, unitCost,
    total, ordenNumber, comsumtion, observation) {
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
        customer_id: idCustomer,
        technician_id: idTechnician,
        branch_office_id: idBranchOffice,
        quantity: quantity,
        reference: reference,
        description: description,
        control: control,
        unit_cost: unitCost,
        total: total,
        //forklift_text: forkliftText,
        //forklift_id: forkliftId,
        orden_number: ordenNumber,
        // settlement_text: settlementText,
        //invoice_text: invoiceText,
        comsumtion: comsumtion,
        observation: observation,
      };
      this.http.patch(this.apiEndPoint + 'api/update_warehouses_out/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deleteWarehousesOut(id: number) {
    console.log('ole ole ole');
    console.log(id);
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
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
      this.http.delete(this.apiEndPoint + 'api/delete_warehouses_out_id/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getWarehousesOut() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.post(this.apiEndPoint + 'api/show_warehouses_out', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  //---------------------------------------------------------------Customer

  getCustomer() {
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
      this.http.get(this.apiEndPoint + 'api/customers', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  getCotmerStatus(status: number) {
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
      this.http.get(this.apiEndPoint + 'api/getCotmerStatus/' + status, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getRegionalCustomers(idRegional: number) {
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
      this.http.get(this.apiEndPoint + 'api/show_customers_regional/' + idRegional, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getSpecificCustomer(id: number) {
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
      this.http.get(this.apiEndPoint + 'api/customers/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getCustomerOffice(idCustomer: number) {
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
      this.http.get(this.apiEndPoint + 'api/customers_branchoffice/' + idCustomer, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getOffices() {
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
      this.http.get(this.apiEndPoint + 'api/branch_offices', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createOffice(customer_id: number, branch_name: string, regional_id: number) {

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
        customer_id: customer_id,
        branch_name: branch_name,
        regional_id: regional_id
      };
      this.http.post(this.apiEndPoint + 'api/branch_offices ', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  updateOffice(id: number,
    customer_id: number,
    branch_name: string,
    regional_id: number

  ) {
    console.log("en servicio");
    console.log(id);
    console.log(customer_id);
    console.log(branch_name);


    return new Promise(resolve => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        customer_id: customer_id,
        branch_name: branch_name,
        regional_id: regional_id
      };
      this.http.patch(this.apiEndPoint + 'api/branch_offices/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  showLogFilter(paramsFilter: string) {
    console.log(paramsFilter)
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
      this.http.get(this.apiEndPoint + 'api/get_log?' + paramsFilter, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  registerLog(user: string, configuration: string, value: number, trmEspa: number) {
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
        user: user,
        configuration: configuration,
        value: value,
        ingresar_constante: trmEspa
      };
      console.log(postParams);
      this.http.post(this.apiEndPoint + 'api/create_log', postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
          console.log(data);
        }, error => {
          resolve(error);
          console.log(error);
        });
    });
  }

  getRoutesSystem() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
      headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
          'Accept': 'application/json'
        })
      };
      this.http.get(this.apiEndPoint + 'api/get_warehouses_regional_id?idRegional=', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  updateRoutes(id: number, description: string) {
    console.log("en servicio");
    console.log(id);
    console.log(description);
    return new Promise(resolve => {
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
      this.http.patch(this.apiEndPoint + 'api/update_route/' + id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  testToken(token: any) {
    return new Promise(resolve => {
      console.log(token);
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Bearer ' + (token)); // 'Bearer ' +
      headers.append('Accept', 'application/json');
      // headers.append('Content-Type', 'application/json');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (token),
          'Accept': 'application/json'
        })
      };
      const postParams = {
        //  Authorization: 'Bearer ' + token,
        // Accept: 'application/json'
      };

      //  alert (postParams.toString());
      this.http.post('http://13.58.95.191/api/details', postParams, httpOptions)
        .map(res => res)
        .subscribe(data => {
          console.log('respuesta: ' + JSON.stringify(data));
          resolve(data);
        }, error => {
          //  alert(error);
          console.log(error);
        });
    });
  }


  createUser2() {
    return new Promise(resolve => {
      const headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      const postParams = {
        name: 'Alfoneso',
        //  lastname: lastname,
        user: 'Alfoneso1234',
        //  cellphone: cellphone,
        //  telephone: telephone,
        password: '123456',
        password_confirmation: '123456',
        email: 'jason@98egmail.com',
        profile_id: 2
      };
      this.http.post('http://3.14.127.210/api/registrar', postParams)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          console.log('error=' + error);
        });
    });
  }
  addProducto(): Observable<any> {
    try {
      console.log('ole ole');
      const json = {
        'user': 'edtisdddonrfs1120',
        'email': 'edistoddnr1@outlook.com',
        'password': 'phpcdeveloper',
        'password_confirmation': 'phpcdeveloper',
        'profile_id': 2
      };
      const params = 'json=' + json;
      // Establecemos cabeceras
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return this.http.post(this.apiEndPoint + 'api/registrar', params, { headers: headers });
    } catch (error) {
      console.log(error);
    }
  }

  getMaintenanceSettlement(status: number) {
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
      this.http.get(this.apiEndPoint + 'api/exportarCustomer/' + status, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
          console.log(error)
        });
    });
  }

  /////////////////PaymentCondition//////////////////////



  getPaymentCondition() {
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
      this.http.get(this.apiEndPoint + 'api/getPaymentCondition', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  PaymentMargin() {
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
      this.http.get(this.apiEndPoint + 'api/PaymentMargin', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  getByIdPaymentCondition(id: number) {
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
      this.http.get(this.apiEndPoint + 'api/payMeByID/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }




  createPayment(conditionalPaymentId: number,
    worth: number,
    id: number,) {
    console.log("hola")
    console.log(conditionalPaymentId + ',' + worth + ',' + id);
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
        conditionalPaymentId: conditionalPaymentId,
        worth: worth,
        id: id,
      };
      this.http.post(this.apiEndPoint + 'api/storeUpdate?conditionalPaymentId='+conditionalPaymentId + '&worth=' + worth + "&id=" + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }




  activate2(conditionalPaymentId: number,
    worth: number,
    id: number,) {
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

      this.http.get(this.apiEndPoint + 'api/storeUpdate?conditionalPaymentId=' + conditionalPaymentId + '&worth=' + worth + "&id=" + id,)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }



  activate(id: number) {
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

      this.http.get(this.apiEndPoint + 'api/activate/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deactivate(id: number) {
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

      this.http.get(this.apiEndPoint + 'api/deactivate/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  deletePaymentMargin(id: number) {
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

      this.http.delete(this.apiEndPoint + 'api/paymentMargindelete/' + id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }







  /////////PaymentCondition///////////////////

















}




