import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable()
export class PersonalService {

  apiEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


createActiviti(description: string, code:string){
  console.log('ole ole ole');
  console.log(description +', '+ code);
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
    };
    console.log(postParams)
    this.http.post(this.apiEndPoint+'api/create_activity', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getActiviti(){
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
    this.http.get(this.apiEndPoint+'api/show_all_activity', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

  deleteActiviti(id:number){
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
      this.http.delete(this.apiEndPoint+'api/delete_activity_id/'+ id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  sendReportEmailAmazon( id_report:number, info:string,  comment: string, subject: string) {
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
      console.log('id_report='+id_report+'&info='+info+'&comment='+comment+'&subject='+subject);

     console.log(' ingreso al correo sobre el info'+info);

      const postParams = {
        id_report: id_report,
        info: info,
        subject:subject,
        comment:comment
      };

     this.http.get(this.apiEndPoint+'api/send_email_teport?id_report='+id_report+'&info='+info+'&comment='+comment+'&subject='+subject,httpOptions)
     // this.http.get(this.apiEndPoint+'api/send_amazon_mail?id_user=197&subject="Buen dia"&id_customer= 118&id_estimate= 277&info=jasoncv0294@gmail.com|eee|ycastrillon0294@gmail.com|lll&comment= "Oiga pues"',httpOptions)
        .map(res => res).subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


updateActiviti(id:number, description:string, code:string){
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

      };
      this.http.patch(this.apiEndPoint+'api/update_activitiy/'+ id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
}


createReportTechnician(title: string, hours:number, observation:string){
  console.log('ole ole ole');
  console.log(title +', '+ hours);
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
      description: title,
      hours: hours,
      observation: observation,
    };
    console.log(postParams)
    this.http.post(this.apiEndPoint+'api/create_report', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getReportTechnician(){
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
    this.http.get(this.apiEndPoint+'api/show_all_reports', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

filter(input:any){
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
    this.http.post(this.apiEndPoint+'api/showAllReportsFilter?input='+input, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getReportTechnicianById(id: number){
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
    this.http.get(this.apiEndPoint+'api/get_report_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

  deleteReportTechnician(id:number){
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
      this.http.delete(this.apiEndPoint+'api/delete_report_id/'+ id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


updateReportTechnician(id:number, description:string, hours:number, observation:string){
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
        hours:hours,
        observation:observation
      };
      console.log(postParams)
      this.http.patch(this.apiEndPoint+'api/update_report/'+ id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
}


createReportTechnicianDetail(id: number, description:string){
  console.log('ole ole ole');
  console.log(description +', '+ id);
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
      technician_report_id: id,
      description: description,
    };
    console.log(postParams)
    this.http.post(this.apiEndPoint+'api/create_detail_report', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


getReportTechnicianDetail(id:number){
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
    this.http.get(this.apiEndPoint+'api/get_detail_report_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
        console.log(data);
      }, error => {
        resolve(error);
      });
  });
}


  deleteReportTechnicianDetail(id:number){
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
      this.http.delete(this.apiEndPoint+'api/delete_report_detail_id/'+ id, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }


  updateReportTechnicianDetail(id:number, description:string){
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
      this.http.patch(this.apiEndPoint+'api/update_detail_report/'+ id, postParams, httpOptions)
        .map(res => res).subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
}

getForkliftReport(){
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
    this.http.get(this.apiEndPoint+'api/get_forklisft_report', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}
getForkliftReportfilter(input:any){
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
    this.http.post(this.apiEndPoint+'api/getForklisftReportFilter?input='+input, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getForkliftReportId(id:number){
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
    this.http.get(this.apiEndPoint+'api/get_forklisft_report_id/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
        console.log(error);
      });
  });
}

deleteForkliftReport(id:number){
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
    this.http.delete(this.apiEndPoint+'api/delete_forklisft_report/'+ id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


createReportForklift(consecutive:number,regional_id:number,customer_id: number, branch_offices_id:number, forklift_id:number,
  technical_reports_id:number){
  console.log('ole ole ole');
  console.log(customer_id);
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
      technical_reports_consecutive: consecutive,
      regional_id: regional_id,
      customer_id: customer_id,
      branch_offices_id: branch_offices_id,
      forklift_id: forklift_id,
      technical_reports_id: technical_reports_id,
      user_id: localStorage.getItem('userid'),
      name_user: localStorage.getItem('name'),
      status:1
    };
    console.log(postParams)
    this.http.post(this.apiEndPoint+'api/create_report_forklift', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


updateReportForklift(id:number,regional_id:number,customer_id: number, branch_offices_id:number, forklift_id:number,technical_reports_id:number){
  console.log('ole ole ole');
  console.log(customer_id);
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
      regional_id: regional_id,
      customer_id: customer_id,
      branch_offices_id: branch_offices_id,
      forklift_id: forklift_id,
      technical_reports_id: technical_reports_id,
      user_id: localStorage.getItem('userid'),
      name_user: localStorage.getItem('name'),

    };
    console.log(postParams)
    this.http.patch(this.apiEndPoint+'api/update_report_forklift/'+id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

createReportForkliftPart(header_id:number, report_description:string, technical_reports_id:number, item_id:number,item_description:string,
  work:string){
  console.log('ole ole ole');
  console.log(header_id);
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

      technical_forklift_reports_id: header_id,
      technical_reports_description: report_description,
      technical_reports_id: technical_reports_id,
      technical_report_details_id: item_id,
      technical_report_details_description: item_description,
      work: work,
      user_id: localStorage.getItem('userid'),

    };
    console.log(postParams)
    this.http.post(this.apiEndPoint+'api/create_report_forklift_detail', postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateReportForkliftPart(id:number, work:string){
  console.log('ole ole ole');
  console.log(work);
  return new Promise(resolve => {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
    headers.append('Cuyg ontent-Type', 'application/json');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
        'Accept': 'application/json'
      })
    };
    const postParams = {

      work: work,
      user_id: localStorage.getItem('userid'),

    };
    console.log(postParams)
    this.http.patch(this.apiEndPoint+'api/update_report_forklift_detail/'+id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}



deleteForkliftReportDetail(id:number){
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
    this.http.delete(this.apiEndPoint+'api/delete_forklisft_report_detail/'+ id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


deleteForkliftReportImage(id:number){
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
    this.http.delete(this.apiEndPoint+'api/delete_report_forklift_image/'+ id, httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getForkliftReportMake(id:number){
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
    this.http.get(this.apiEndPoint+'api/get_forklisft_report_make/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
        console.log(error);
      });
  });
}

getForkliftReportImage(id:number){
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
    this.http.get(this.apiEndPoint+'api/get_forklisft_report_image/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
        console.log(error);
      });
  });
}

createReportFile(report_Forklift_id: number, url: string) {
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
    technical_forklift_reports_id: report_Forklift_id,
    image:url,
  };
  this.http.post(this.apiEndPoint+'api/create_report_forklift_image', postParams, httpOptions)
  .map(res => res).subscribe(data => {
  resolve(data);
  }, error => {
  resolve(error);
 });
});
}

getForkliftReportConsecutive(){
  console.log();
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
    this.http.get(this.apiEndPoint+'api/get_report_consecutive', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
        console.log(error);
      });
  });
}

updateReportForkliftConsecutivo(){
  console.log('ole ole ole');
  // console.log(work);
  return new Promise(resolve => {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + (localStorage.getItem('token_user')));
    headers.append('Cuyg ontent-Type', 'application/json');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token_user'),
        'Accept': 'application/json'
      })
    };

    this.http.patch(this.apiEndPoint+'api/update_report_consecutive', httpOptions)
      .map(res => res).subscribe(data => {
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}


}
