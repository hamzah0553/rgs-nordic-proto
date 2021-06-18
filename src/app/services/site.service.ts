import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Site } from '../core/models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  
  private currentSiteSubject: BehaviorSubject<Site> = new BehaviorSubject<Site>(null);

  constructor(private httpClient: HttpClient) { }

  public getCurrentSite() {
    return this.currentSiteSubject.asObservable();
  }

  public setCurrentSite(site: Site) {
    this.currentSiteSubject.next(site);
  }
}
