import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {

  private api = environment.url_api;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/login/`, data);
  }

  crearUsuario(data: any) {
    return this.http.post(`${this.api}/users/`, data);
  }

  getVersion() {
    return this.http.get(`${this.api}/api/version/`);
  }
}
