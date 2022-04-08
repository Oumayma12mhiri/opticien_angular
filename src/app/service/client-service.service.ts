import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient,private authService:AuthenticationServiceService) { }




  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization":"Bearer "+ this.authService.getToken()    
    });
    return headers;
  }



  public getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.API_URL + "clients/getAll",{headers :this.getHeaders()});
  }

  public postClient(client: any) {
    return this.http.post<Client>(environment.API_URL + "clients/addClient", client, { headers: this.getHeaders() });
  }

  public UpdateClient(client: Client, id: number) {
    return this.http.put<any>(environment.API_URL + "clients/editClient/" + id, client , { headers: this.getHeaders() })
  }

  public DeleteClient(id: number) {
    return this.http.delete<any>(environment.API_URL + "clients/removeClient/" + id , { headers: this.getHeaders() })
  }
}
