import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from '../core/models/cell';

@Component({
  selector: 'app-cell-info',
  templateUrl: './cell-info.component.html',
  styleUrls: ['./cell-info.component.css']
})
export class CellInfoComponent implements OnInit {

  @Input() public cell: Cell;
  @Output() public caseEventEmitter = new EventEmitter<string>();
  @Output() public wasteEventEmitter = new EventEmitter<string>();  

  constructor() { }

  ngOnInit(): void {

  }

  public caseFieldChanged(value: string) {
    this.caseEventEmitter.emit(value);
  }

  public wasteFieldChanged(value: string) {
    this.wasteEventEmitter.emit(value);
  }
}
