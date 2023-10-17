import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { identifierName } from '@angular/compiler';

@Injectable()
export class QuestionService {
  apiEndPoint = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  createQuestion( description: string) {
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
    this.http.post(this.apiEndPoint+'api/create_question?', postParams, httpOptions)
    .map(res => res).subscribe(data => {
      resolve(data);
      }, error => {
      resolve(error);
      });
    });
}

showQuestion() { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_question_all', httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

getQuestionId(id: number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_question/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateQuestion(id: number,description: string) {
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
    this.http.patch(this.apiEndPoint+'api/update_question/' + id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        resolve(error);
      });
  });
}

deleteQuestion(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_question/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

createAnswer(questions_id: number, description: string) {
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
    questions_id: questions_id,
    description: description,
  };
  this.http.post(this.apiEndPoint+'api/create_answer', postParams, httpOptions)
  .map(res => res).subscribe(data => {
    console.log(data);
    resolve(data);
    }, error => {
    resolve(error);
    });
  });
}

getAnswerId(id: number) { // Falta implementar desde el backend
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
    this.http.get(this.apiEndPoint+'api/get_answer/'+id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

updateAnswer(id: number,description: string) {
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
    this.http.patch(this.apiEndPoint+'api/update_answer/' + id, postParams, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        resolve(error);
      });
  });
}

deleteAnswer(id: number) {
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
    this.http.delete(this.apiEndPoint+'api/delete_answer/' + id, httpOptions)
      .map(res => res).subscribe(data => {
        console.log(data)
        resolve(data);
      }, error => {
        resolve(error);
      });
  });
}

}
