import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { SiteService } from '../../../services/site.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private siteService: SiteService) { }

  public currentSite: Site;

  ngOnInit(): void {
    this.siteService.getCurrentSite().subscribe(site => {
      console.log(site);
      this.currentSite = site;
      if (this.currentSite == null) {
        this.currentSite = new Site();
      }
    })
  }

}
