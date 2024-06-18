import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/category/add`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  update(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/category/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getCategory(): Observable<any> {
    return this.httpClient.get(`${this.url}/category/get`);
  }

  getFilteredCategories() {
    return this.httpClient.get(`${this.url}/category/get?filterValue=true`);
  }
}
