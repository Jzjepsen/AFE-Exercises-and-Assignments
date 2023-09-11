import { Injectable } from '@angular/core';
import { IClient } from './IClient';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, retryWhen, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  host = 'http://localhost:3100/exercise/client/'

  constructor(private httpClient: HttpClient) { }
  
  getClients(): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(this.host).pipe(
      catchError((e: HttpErrorResponse) =>
      {
        console.error(e.message)
        return throwError(() => e);
      }),
      retry(5)
    )
  }
}
