import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CellApiService } from '../core/api/cell-api.service';
import { Cell } from '../core/models/cell';
import { CellService } from '../services/cell.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, OnDestroy {

  public currentCell: Cell;
  public subscription = new Subscription();

  constructor(private cellService: CellService, private cellApiService: CellApiService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let sub = this.cellService.cellObserveable$.subscribe(cell => {
      this.currentCell = cell;
    });
    this.subscription.add(sub);
  }

  public caseFieldChanged(value: string) {
    console.log(value);
  }

  public wasteFieldChanged(value: string) {
    console.log(value);
  }
}
