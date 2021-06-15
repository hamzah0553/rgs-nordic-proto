import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../models/site';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  
  public $sites: Observable<Site[]>;

  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
    this.$sites = this.siteService.getSites();
    this.siteService.getSites().subscribe(result => {
      console.log(result);
    })
  }

}
