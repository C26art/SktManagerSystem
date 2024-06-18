import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/product/add`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  update(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/product/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getProduct(): Observable<any> {
    return this.httpClient.get(`${this.url}/product/get`);
  }

  updateStatus(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/product/updateStatus`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  delete(id: any) {
    return this.httpClient.post(`${this.url}/product/delete/${id}`, {}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getProductByCategory(id: any) {
    return this.httpClient.get(`${this.url}/product/getByCategory/${id}`);
  }

  getById(id: any) {
    return this.httpClient.get(`${this.url}/product/getById/${id}`);
  }
}
