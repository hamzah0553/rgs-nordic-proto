import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cell } from '../core/models/cell';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  private cellSubject$: BehaviorSubject<Cell> = new BehaviorSubject<Cell>(null);
  public cellObserveable$ = this.cellSubject$.asObservable();

  public setCurrentCell(cell: Cell) {
    this.cellSubject$.next(cell);
  }
  
}
