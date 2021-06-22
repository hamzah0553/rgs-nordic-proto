import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Case } from '../models/case';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class CaseApiService {

  apiBaseUrl = environment.api + "cell";

  constructor(private httpClient: HttpClient) { }

  public putCase(value: Case) {
    return this.httpClient.put<Site>(this.apiBaseUrl, value)
  }
  
}
