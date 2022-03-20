import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }

 
  

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
    return headers;
  }

  public postClient(client: any) {
    return this.http.post<Client>(environment.API_URL+"client/", client, { headers: this.getHeaders() });
  }
  
  public getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.API_URL+"client/get/");
  }

  public getClientByNomPrenom(nomPrenom: any): Observable<Client[]> {
    return this.http.get<Client[]>(environment.API_URL+"client/get/"+ nomPrenom);
  }

  public UpdateClient(client: Client, id: number) {
    return this.http.put<any>(environment.API_URL+"client/put/"+id, client)
  }
  
  public DeleteClient(id: number) {
    return this.http.delete<any>(environment.API_URL+"client/delete/"+ id)
  }
}
