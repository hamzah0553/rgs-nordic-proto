import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Case } from '../models/case';
import { Cell } from '../models/cell';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class CaseApiService {

  apiBaseUrl = environment.api + "case";

  constructor(private httpClient: HttpClient) { }

  public putCase(value: Cell) {
    return this.httpClient.put<Site>(this.apiBaseUrl, value)
  }
  
}
