import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { AuthService } from './autho.service';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  signup(data: any) {
    return this.httpClient.post(`${this.apiUrl}/user/signup`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(`${this.apiUrl}/user/forgotPassword`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  checkToken() {
    if (this.authService.isAuthenticated()) {
      return this.httpClient.get(`${this.apiUrl}/user/checkToken`, {
        headers: this.getHeaders()
      });
    } else {
      return of({ error: 'Usuário não autenticado' });
    }
  }

  changePassword(data: any) {
    if (this.authService.isAuthenticated()) {
      return this.httpClient.post(`${this.apiUrl}/user/changePassword`, data, {
        headers: this.getHeaders()
      });
    } else {
      return of({ error: 'Usuário não autenticado' });
    }
  }

  getUsers(){
    return this.httpClient.get(`${this.apiUrl}/user/get`);
  }

  update(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
