import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
import { integer } from 'aws-sdk/clients/cloudfront';


@Injectable()
export class SettlementService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  showSettlementConsecutive() { // Falta implementar desde el backend
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
      this.http.get(this.apiEndPoint+'api/settlement_consecutive', httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  createSettlement(settlement_consecutive: number, customer_id: number, customer_document: string,
    department_id: number, city_id: number, contact: string,
    telephone: string, observation: string, total: number, email:string, status:number,
    regional_id: number, cost_center_id:number,warehouse_id:number, estimate_order:number, branch_office_id:number,
     forklift_id:number, forklift_text: string) {
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

//payment_method: payment_method,
//guaranty: guaranty,
//validity: validity,
console.log('oficina '+branch_office_id);
console.log( localStorage.getItem('userid'));
const postParams = {
elaborate_user_id:  localStorage.getItem('userid'),
settlement_consecutive: settlement_consecutive,
customer_id: customer_id,
customer_document: customer_document,
department_id: department_id,
city_id: city_id,
contact: contact,
telephone: telephone,
observation: observation,
total: total,
email:email,
status:status,
regional_id: regional_id,
cost_center_id: cost_center_id,
warehouse_id: warehouse_id,
estimate_order: estimate_order,
branch_office_id:branch_office_id, 
forklift_id:forklift_id,
forklift_text:forklift_text
};


this.http.post(this.apiEndPoint+'api/create_settlement', postParams, httpOptions)
.map(res => res).subscribe(data => {

resolve(data);
}, error => {
resolve(error);
});
});
}



updateConsecutive() {
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
    this.http.patch(this.apiEndPoint+'api/update_settlement_consecutive',postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getSettlemetSpecific(id:number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/settlements/'+ id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getValidationDifference(settlement_id:number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/total_comparison?settlement_id='+ settlement_id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


updateSettlement(id:number, customer_id: number, customer_document: string,
  department_id: number, city_id: number, contact: string, telephone: string, observation: string,
   regional_id: number, cost_center_id: number, warehouse_id:number, estimate_order:string, branch_office_id:number,
   forklift_id:number, forklift_text: string) {
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
    customer_id: customer_id,
    customer_document: customer_document,
    department_id: department_id,
    city_id: city_id,
    contact: contact,
    telephone: telephone,
    observation: observation,
    regional_id: regional_id,
    cost_center_id: cost_center_id,
    warehouse_id: warehouse_id,
    estimate_order: estimate_order,
    branch_office_id: branch_office_id,
    forklift_id: forklift_id,
    forklift_text: forklift_text
    };
this.http.patch(this.apiEndPoint+'api/update_settlement/'+id, patchParams, httpOptions)
.map(res => res).subscribe(data => {
resolve(data);
}, error => {
resolve(error);
});
});
}







updateSettlementDetailWorkforce(settlement_detail_id: number, code: string, service: string,
  quantity: number, hour_value: number, subtotal: number, delivery: number, total: string,
  status: number, type_service: number,  subcenter_id: number, discount: number, fullCode:string,
  estimate_detail_id:any, 
  branch_office_id: any,forklift_id:any) {
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
code: code,
quantity: quantity,
service:service,
hour_value: hour_value,
subtotal: subtotal,
delivery: delivery,
total: total,
status:status,
type_service:type_service,
subcost_center_id: subcenter_id,
discount: discount,
full_code:fullCode,
estimate_detail_id:estimate_detail_id,
branch_office_id:branch_office_id,
forklift_id:forklift_id
};
this.http.patch(this.apiEndPoint+'api/update_settlement_details/'+settlement_detail_id, postParams, httpOptions)
.map(res => res).subscribe(data => {
resolve(data);
}, error => {
resolve(error);
});
});
}


updateSettlementDetailCustomer(settlement_detail_customer_id: number, code: string, service: string,
      quantity: number, hour_value: number, delivery: number, subtotal: number, total: string,
      status: number, subcenter_id: number, discount: number, fullCode:string,branch_office_id:any,
      forklift_id:any) {
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
    code: code,
    quantity: quantity,
    service:service,
    unit_cost:hour_value,
    price: hour_value,
    subtotal: subtotal,
    delivery: delivery,
    total: total,
    status:status,
    subcost_center_id: subcenter_id,
    discount: discount,
    full_code:fullCode,
    branch_office_id:branch_office_id,
    forklift_id:forklift_id
    };
    console.log(postParams);
    this.http.patch(this.apiEndPoint+'api/update_settlement_details_customer/'+settlement_detail_customer_id, postParams, httpOptions)
    .map(res => res).subscribe(data => {
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
    }


getSettlementDetails(idSettlement:number) {
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
    this.http.get(this.apiEndPoint+'api/settlement_details_general/'+idSettlement, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


createEmailsSettlement(settlement_id: number, subject: string, comment: string,
  check_hide_code :number, params:string) {
    console.log(params);
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
settlement_id:  settlement_id,
subject: subject,
comment: comment,
check_hide_code: check_hide_code,
params: params
};
this.http.patch(this.apiEndPoint+'api/update_emails_settlement', patchParams, httpOptions)
.map(res => res).subscribe(data => {
resolve(data);
}, error => {
resolve(error);
});
});
}




getSettlementDetailFiles(idSettlement:number) {
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
    console.log('idsettlement '+idSettlement);
    this.http.get(this.apiEndPoint+'api/get_idsettlement_files?settlement_id='+idSettlement+'&type=0', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


deleteSettlementFile(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_settlement_file/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


createSettlementFile(settlement_id: number, bucket: string, url: string, type: number, nameFile:string) {
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
  settlement_id: settlement_id,
  bucket: bucket,
  url:url,
  type: type,
  name: nameFile
  };
  this.http.post(this.apiEndPoint+'api/create_settlement_file', postParams, httpOptions)
  .map(res => res).subscribe(data => {
  resolve(data);
  }, error => {
  resolve(error);
 });
});
}

getSettlementDetailsWorkforce(idSettlement:number) {
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
    this.http.get(this.apiEndPoint+'api/settlement_details_general_workforce/'+idSettlement, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getSettlementDetailsParts(idSettlement:number) {
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
    this.http.get(this.apiEndPoint+'api/settlement_details_general_parts/'+idSettlement, httpOptions)
    .map(res => res).subscribe(data => {
      console.log('uno');
      console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getSettlementEmails(idSettlement:number) {
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
    this.http.get(this.apiEndPoint+'api/get_settlement_emails_client/'+idSettlement, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

deleteSettlementDetail(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_settlement_details/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

deleteSettlementDetailCustomer(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_settlement_details_customer/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getSettlementDetailsCustomer(idSettlement:number) {
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
    this.http.get(this.apiEndPoint+'api/settlement_details_general_customer/'+idSettlement, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

createScheduleSettlement(params: string) {
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
    const postParams = {
    params: params
    };
    this.http.post(this.apiEndPoint+'api/scheduled_settlement', postParams, httpOptions)
    .map(res => res).subscribe(data => {
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
  }

  updateScheduleSettlement(params: string) {
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
      params: params
      };
      this.http.patch(this.apiEndPoint+'api/update_scheduled_settlement', patchParams, httpOptions)
      .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
      });
      });
    }

    getScheduleSettlementCustomer(idSettlement:number) {
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
        this.http.get(this.apiEndPoint+'api/get_scheldule_settlements_customer/'+idSettlement, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getSubCostCenters(id){
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
        this.http.get(this.apiEndPoint+'api/get_sub_cost_centers_id/'+id, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getSettlementEstimateCustomer(idCustomer:number, idBranchOffice:number, numberPage:number, from_date,to_date) {
      console.log('customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&page='+numberPage+'&&from_date'+from_date+'&&to_date'+to_date);
      console.log(idCustomer);
      console.log('customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&page='+numberPage+'&&from_date'+from_date+'&&to_date='+to_date);
      console.log('customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&page='+numberPage+'&&from_date'+from_date+'&&to_date'+to_date);
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
        
        this.http.get(this.apiEndPoint+'api/settlement_estimate_customer?customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&page='+numberPage+'&&from_date='+from_date+'&&to_date='+to_date, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getSettlementEstimateForklift(idCustomer:number, idBranchOffice:number,from_date,to_date) {
      console.log('customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&from_date='+from_date+'&&to_date='+to_date);
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
        
        this.http.get(this.apiEndPoint+'api/settlement_estimate_forklift?customer_id='+idCustomer+'&&branch_office_id='+idBranchOffice+'&&from_date='+from_date+'&&to_date='+to_date, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getSettlementEstimateCopyClient(idSettlement:number) {
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
        this.http.get(this.apiEndPoint+'api/settlement_estimate_copy_client?settlement_id='+idSettlement, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }


    getSettlementCodes() { // Falta implementar desde el backend
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
        this.http.get(this.apiEndPoint+'api/codes_settlement', httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    getRegionalSubCenterCost(regionalId: number) { // Falta implementar desde el backend
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
        this.http.get(this.apiEndPoint+'api/get_sub_cost_centers_id/'+regionalId, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }
    

    copyEstimateToSettlement(settlementId: number, estimateItems:Array<Number>) {
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

        console.log(settlementId,  estimateItems);
        const postParams = {
          settlement_id: settlementId,
          details_id:estimateItems
        };
        console.log(postParams);
        this.http.post(this.apiEndPoint+'api/copy_estimate_settlement', postParams, httpOptions)
        .map(res => res).subscribe(data => {
        resolve(data);
        }, error => {
        resolve(error);
        });
        });
      }

      copySettlementCustomer(settlementId: number, estimateItems:Array<Number>) {
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
  
          console.log(settlementId,  estimateItems);
          const postParams = {
            settlement_id: settlementId,
            details_id:estimateItems
          };
          this.http.post(this.apiEndPoint+'api/copy_estimate_settlement_customer', postParams, httpOptions)
          .map(res => res).subscribe(data => {
          resolve(data);
          }, error => {
          resolve(error);
          });
          });
        }

      createSettlementDetails(settlement_id: number, code: string, description: string,
        quantity: number, unit_cost: number, price_list: number, price_suggest: number, weight: number,
        price: number, subtotal: number, delivery: number, total: string,
        status: number, type_service: number, weight_type: number, subcenter_id: number, 
        discount: number, fullCode:string,branch_office_id:any,forklift_id:any) {
        console.log('info de detalle');
        console.log(settlement_id+'-'+ code+'-'+ description+'-'+
          quantity+'-'+ unit_cost+'-'+ price_list+'-'+ price_suggest+'-'+
          price+'-'+ delivery+'-'+ total+'-'+
          status)
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
    settlement_id: settlement_id,
    subcost_center_id: subcenter_id,
    discount: discount,
    code: code,
    full_code:fullCode,
    description: description,
    quantity: quantity,
    unit_cost: unit_cost,
    price_list: price_list,
    price_suggest: price_suggest,
    weight:weight,
    price: price,
    subtotal: subtotal,
    delivery: delivery,
    total: total,
    status:status,
    type_service:type_service,
    weight_type:weight_type,
    branch_office_id:branch_office_id,
  forklift_id:forklift_id
    };
    this.http.post(this.apiEndPoint+'api/create_settlement_detail', postParams, httpOptions)
    .map(res => res).subscribe(data => {
    resolve(data);
    }, error => {
    resolve(error);
    });
    });
    }

    createSettlementDetailWorkforce(settlement_id: number, code: string, description: string,
      quantity: number, hour_value: number, subtotal: number, delivery: number, total: string,
      status: number, type_service: number, subcenter_id: number, discount: number, fullCode:string,
      branch_office_id:any,forklift_id:any) {
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
  settlement_id: settlement_id,
  subcost_center_id: subcenter_id,
  discount: discount,
  code: code,
  full_code:fullCode,
  service: description,
  quantity: quantity,
  hour_value: hour_value,
  subtotal: subtotal,
  delivery: delivery,
  total: total,
  status:status,
  type_service:type_service,
  branch_office_id:branch_office_id,
  forklift_id:forklift_id
  };
  this.http.post(this.apiEndPoint+'api/create_settlement_detail', postParams, httpOptions)
  .map(res => res).subscribe(data => {
  resolve(data);
  }, error => {
  resolve(error);
  });
  });
  }

  createSettlementDetailsCustomer(settlement_id: number, code: string, description: string,
      quantity: number, unit_cost: number, price: number, subtotal: number, delivery: number, total: string,
      status: number, subcenter_id: number, discount: number, fullCode:string,branch_office_id:any,
      forklift_id:any) {
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
  settlement_id: settlement_id,
  subcost_center_id: subcenter_id,
  discount: discount,
  code: code,
  full_code:fullCode,
  description: description,
  quantity: quantity,
  unit_cost: unit_cost,
  price: price,
  subtotal: subtotal,
  delivery: delivery,
  total: total,
  status:status,
  branch_office_id:branch_office_id,
  forklift_id:forklift_id
  };
  this.http.post(this.apiEndPoint+'api/create_settlement_detail_customer', postParams, httpOptions)
  .map(res => res).subscribe(data => {
  resolve(data);
  }, error => {
  resolve(error);
  });
  });
  }


    // Organizar api de actualizacion;
    updateSettlementDetails(settlement_id: number, code: string, description: string,
      quantity: number, unit_cost: number, price_list: number, price_suggest: number, weight: number,
      price: number, subtotal: number, delivery: number, total: string,
      status: number, type_service: number, weight_type: number, subcenter_id: number, discount: number, fullCode:string, estimate_detail_id:any,
      branch_office_id:any,forklift_id:any) {
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
  code: code,
  description: description,
  quantity: quantity,
  unit_cost: unit_cost,
  price_list: price_list,
  price_suggest: price_suggest,
  weight:weight,
  price: price,
  subtotal: subtotal,
  delivery: delivery,
  total: total,
  status:status,
  type_service:type_service,
  weight_type:weight_type,
  subcost_center_id: subcenter_id,
  discount: discount,
  full_code:fullCode,
  estimate_detail_id:estimate_detail_id,
  branch_office_id:branch_office_id,
  forklift_id:forklift_id
  };
  console.log(settlement_id);
  console.log(patchParams);
  this.http.patch(this.apiEndPoint+'api/update_settlement_details/'+settlement_id, patchParams, httpOptions)
  .map(res => res).subscribe(data => {
  console.log('respuesta');
  resolve(data);
  }, error => {
  resolve(error);
  });
  });
  }


  getWarehouese(id: number){
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
            this.http.get(this.apiEndPoint+'api/get_warehouses_regional_id?idRegional='+id, httpOptions)
              .map(res => res).subscribe(data => {
                resolve(data);
              }, error => {
                resolve(error);
              });
          });
    }

    getSubCostCenter(id: number){
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
                this.http.get(this.apiEndPoint+'api/get_subcost_centers_center_id?idRegional='+id, httpOptions)
                  .map(res => res).subscribe(data => {
                    resolve(data);
                  }, error => {
                    resolve(error);
                  });
              });
    }

    getCostCenter(id: number){
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
                      this.http.get(this.apiEndPoint+'api/get_cost_centers_regionals_id?idRegional='+ id, httpOptions)
                        .map(res => res).subscribe(data => {
                          resolve(data);
                        }, error => {
                          resolve(error);
                        });
                    });
   }

    /*showSettlementFilter(paramsFilter: string) { 
                          console.log()
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
                            this.http.get(this.apiEndPoint+'api/get_settlement?' + paramsFilter, httpOptions)
                              .map(res => res).subscribe(data => {
                                console.log(data);
                                resolve(data);
                              }, error => {
                                resolve(error);
                              });
                          });
    }*/

    showSettlementFilter(paramsFilter: string) { // Falta implementar desde el backend
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
        this.http.get(this.apiEndPoint+'api/get_settlement?' + paramsFilter, httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    assingInvoice(invoice: number, id: number){
      console.log(invoice)
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
                            const postParams = {
                              invoice: invoice,
                              id: id
                            };
                            console.log(postParams);
                            this.http.post(this.apiEndPoint+'api/assign_invoice', postParams, httpOptions)
                              .map(res => res).subscribe(data => {
                                console.log(data);
                                resolve(data);
                              }, error => {
                                resolve(error);
                              });
                          });
    }

    sendSettlementEmailAmazon(idUser: number, idCustomer: number, idEstimate:number, info:string,  comment: string, subject: string) {
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
        console.log('id_user='+ idUser+'&id_customer='+idCustomer
        +'&id_estimate='+idEstimate+'&info='+info+'&comment='+comment+'&subject='+subject);
  
       console.log(' ingreso al correo sobre el info'+info);
   
        const postParams = {
          id_user: idUser,
          id_settlement: idEstimate,
          info: info,
          id_customer: idCustomer,
          subject:subject,
          comment:comment
        };
  
       this.http.get(this.apiEndPoint+'api/send_amazon_mail_settlement?id_user='+ idUser+'&id_customer='+idCustomer
        +'&id_settlement='+idEstimate+'&info='+info+'&comment='+comment+'&subject='+subject,httpOptions)
       // this.http.get(this.apiEndPoint+'api/send_amazon_mail?id_user=197&subject="Buen dia"&id_customer= 118&id_estimate= 277&info=jasoncv0294@gmail.com|eee|ycastrillon0294@gmail.com|lll&comment= "Oiga pues"',httpOptions)
          .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            console.log(error);
            console.log(JSON.stringify(error));
            resolve(error);
          });
      });
    }

    updateSettlementStatus(id:number, status:number) {
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
          status: status
        };
        this.http.patch(this.apiEndPoint+'api/update_settlement_status/' + id, postParams, httpOptions)
          .map(res => res).subscribe(data => {
            resolve(data);
          }, error => {
            resolve(error);
          });
      });
    }

    //Nombre original de este metodo es createSettlementFiles se le agrega uns S
  // por duplicidad de nombre al hacer pull
    createSettlementFiles(estimate_id: number, bucket: string, url: string, type: number, nameFile:string) {
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
      estimate_id: estimate_id,
      bucket: bucket,
      url:url,
      type: type,
      name: nameFile
      };
      this.http.post(this.apiEndPoint+'api/create_settlement_file', postParams, httpOptions)
      .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
     });
    });
  }

  totalComparisonSettlement(settlement_id:number) {
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
        settlement_id: settlement_id,
      };
      console.log(settlement_id);
      this.http.get(this.apiEndPoint+'api/total_comparison?settlement_id='+settlement_id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getSettlementId(id: any){
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
      console.log(id)
      this.http.get(this.apiEndPoint+'api/get_settlement_id/'+id, httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  getMaintenanceFilter(branch_office:number, maintenance:any, customer_id:any) {
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
    const params = {
      maintenance:maintenance,
      branch_office:branch_office,
      customer_id:customer_id
    }
    console.log(params);
    this.http.get(this.apiEndPoint+'api/get_maintenances?'+'maintenance='+maintenance+'&branch_office='+branch_office+'&customer_id='+customer_id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

    storeSettlementMaintenance(settlement_id: number, maintenance: any) {
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
          settlement_id: settlement_id,
          maintenance: maintenance,
        };
        console.log(postParams)
  
       this.http.post(this.apiEndPoint+'api/store_maintenance_settlement',postParams,httpOptions)
       .map(res => res).subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
            console.log(error);
            console.log(JSON.stringify(error));
            resolve(error);
          });
      });
    }
  
}
