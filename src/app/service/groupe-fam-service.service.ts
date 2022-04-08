import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Groupe } from '../model/groupe_fam';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class GroupeFamServiceService {

  constructor(private http: HttpClient,
    private authService: AuthenticationServiceService) { }

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer " + this.authService.getToken()
    });
    return headers;
  }

  public getGroupe(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(environment.API_URL + "groupes/getAll", { headers: this.getHeaders() });
  }

  public postGroupe(groupe_fam: any) {
    return this.http.post<Groupe>(environment.API_URL + "groupes/addGrp", groupe_fam, { headers: this.getHeaders() });
  }

  public UpdateGroupe(groupe_fam: Groupe, id: number) {
    return this.http.put<any>(environment.API_URL + "groupes/editGrp/" + id, groupe_fam, { headers: this.getHeaders() })
  }

  public DeleteGroupe(id: number) {
    return this.http.delete<any>(environment.API_URL + "groupes/removeGrp/" + id, { headers: this.getHeaders() })
  }
}
