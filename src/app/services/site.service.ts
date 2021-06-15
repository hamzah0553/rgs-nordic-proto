import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  apiBaseUrl = environment.api + "site";

  constructor(private httpClient: HttpClient) { }

  public getSites() {
    return this.httpClient.get<Site[]>(this.apiBaseUrl);
  }
}
