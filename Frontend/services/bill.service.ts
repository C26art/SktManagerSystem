import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  generateReport(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/bill/generateReport`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


  getPdf(data: any): Observable<Blob> {
    return this.httpClient.post(`${this.url}/bill/getPdf`, data, {
      responseType: 'blob'
    }).pipe(
      catchError((error: any) => {
        let errorMessage = 'Unknown error';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error('Error fetching PDF:', errorMessage);
        return throwError(() => new Error('Error fetching PDF: ' + errorMessage));
      })
    );
  }

  getBills(): Observable<any> {
    return this.httpClient.get(`${this.url}/bill/getBills`);
  }

  delete(id: any) {
    return this.httpClient.post(`${this.url}/bill/delete/${id}`, {}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
