import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HelmetService {

  constructor(private http: Http) { }

  getHelmets() {
    let apiserver = 'http://127.0.0.1:5000/';
    return this.http.get(apiserver + 'helmet?max_results=500')
      .map(response => response.json());
  }

}
