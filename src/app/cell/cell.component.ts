import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseApiService } from '../core/api/case-api.service';
import { CellApiService } from '../core/api/cell-api.service';
import { Cell } from '../core/models/cell';
import { CellService } from '../services/cell.service';
import { debounceTime } from "rxjs/operators";
import { Case } from '../core/models/case';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, OnDestroy {

  public currentCell: Cell;
  public subscription = new Subscription();

  constructor
    (
      private cellService: CellService,
      private cellApiService: CellApiService,
      private caseApiService: CaseApiService,
    ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let sub = this.cellService.cellObserveable$.subscribe(cell => {
      // if (cell != null && !cell.case) {
      //   cell.case = new Case();
      // }
      this.currentCell = cell;
    });
    this.subscription.add(sub);
  }

  public caseFieldChanged(value: string) {
    if (!this.currentCell.case) {
      this.currentCell.case = new Case();
    }
    this.currentCell.case.caseId = value;
    this.caseApiService.putCase(this.currentCell).subscribe();
  }

  public wasteFieldChanged(value: string) {
    let valueNumb = Number.parseFloat(value);
    if (!this.currentCell.case) {
      this.currentCell.case = new Case();
    }
    this.currentCell.case.amountOfWaste = valueNumb;
    this.caseApiService.putCase(this.currentCell).subscribe();
  }
}
