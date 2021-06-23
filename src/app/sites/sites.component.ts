import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteApiService } from '../core/api/site-api.service';
import { Site } from '../core/models/site';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit, OnDestroy {

  
  public $sites: Observable<Site[]>;

  constructor(
    private siteService: SiteService,
    private siteApiService: SiteApiService, 
    private route: Router) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.siteService.setCurrentSite(null);
    
    this.$sites = this.siteApiService.getSites();
  }

  /**
   * openSite
   */
  public openSite(site: Site) {
    this.siteService.setCurrentSite(site); 
    this.route.navigateByUrl(site.id + '/dashboard')
  } 

}
