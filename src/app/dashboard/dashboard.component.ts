import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CellApiService } from '../core/api/cell-api.service';
import { SiteApiService } from '../core/api/site-api.service';
import { Case } from '../core/models/case';
import { Cell } from '../core/models/cell';
import { Site } from '../core/models/site';
import { CellService } from '../services/cell.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public currentSite: Site;
  public gridCol;
  public subscription: Subscription = new Subscription;

  constructor(
    private siteService: SiteService,
    private siteApiService: SiteApiService,
    private cellService: CellService,
    private cellApiService: CellApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let currentSiteSub = this.siteService.getCurrentSite().subscribe(currentSite => {
      this.currentSite = currentSite; 
      if (!this.currentSite) {
        let siteId = this.activatedRoute.snapshot.params.id;
        let siteSub = this.siteApiService.getSite(siteId).subscribe(newSite => {
          this.siteService.setCurrentSite(newSite);
          this.currentSite = newSite;
        });
        this.subscription.add(siteSub);
      }
    });
    this.subscription.add(currentSiteSub);
  }

  public tileClicked(cell: Cell) {
    cell.siteId = this.currentSite.id;
    let getCellSub = this.cellApiService.searchCell(cell).subscribe(result => {
      if (!result) {
        let postCellSub = this.cellApiService.postCell(cell).subscribe(newCell => {
          this.cellService.setCurrentCell(newCell);
        });
        this.subscription.add(postCellSub);
      }
      else {
        this.cellService.setCurrentCell(result);
      }
    });
    this.subscription.add(getCellSub);
  }
}

