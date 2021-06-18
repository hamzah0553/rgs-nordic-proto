import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteApiService } from '../core/api/site-api.service';
import { Cell } from '../core/models/cell';
import { Site } from '../core/models/site';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentSite: Site;
  public gridCol;

  constructor(
    private siteService: SiteService,
    private siteApiService: SiteApiService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.siteService.getCurrentSite().subscribe(currentSite => {
      this.currentSite = currentSite; 
      if (!this.currentSite) {
        let siteId = this.activatedRoute.snapshot.params.id;
        this.siteApiService.getSite(siteId).subscribe(newSite => {
          this.siteService.setCurrentSite(newSite);
          this.currentSite = newSite;
        });
      }
    });
  }

  private generateCells() {
    if (this.currentSite.siteGridCells == null || this.currentSite.siteGridCells.length == 0) {
      let rowCount = this.currentSite.rowCount;
      let colCount = this.currentSite.colCount;
      var cells = new Array<Site>(rowCount * colCount);
      for (let i = 0; i < this.currentSite.rowCount; i++) {
        for (let j = 0; j < this.currentSite.colCount; j++) {
          
          
        }
        
      }
    }
  }
}

