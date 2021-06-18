import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Site } from 'src/app/core/models/site';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteApiService {

  apiBaseUrl = environment.api + "site";

  constructor(private httpClient: HttpClient) { }

  public getSites() {
    return this.httpClient.get<Site[]>(this.apiBaseUrl);
  }

  public getSite(siteId: string) {
    return this.httpClient.get<Site>(`${this.apiBaseUrl}/${siteId}`)
  }
}
