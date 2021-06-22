import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Cell } from '../core/models/cell';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { Case } from '../core/models/case';

@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css']
})
export class CellInfoComponent implements OnInit, OnChanges {

  @Input() public cell: Cell = new Cell();
  @Output() public caseEventEmitter = new EventEmitter<string>();
  @Output() public wasteEventEmitter = new EventEmitter<number>();

  private caseSub = new Subject<string>();
  private wasteSub = new Subject<number>();
  public caseVal = "";
  public wasteVal = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cell.case) {
      this.caseVal = this.cell.case.caseId;
      this.wasteVal = this.cell.case.amountOfWaste;
    }
    else {
      this.caseVal = "";
      this.wasteVal = 0;
    }
  }

  ngOnInit(): void {
    this.caseSub.pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.caseEventEmitter.emit(value.toString());
    });

    this.wasteSub.pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.wasteEventEmitter.emit(Number.parseFloat(value.toString()));
    });
  }

  public caseFieldChanged() {
    this.caseSub.next(this.caseVal)
  }

  public wasteFieldChanged() {
    this.wasteSub.next(this.wasteVal);
  }
}
