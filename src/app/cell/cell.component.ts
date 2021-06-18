import { Component, OnInit } from '@angular/core';
import { CellApiService } from '../core/api/cell-api.service';
import { CellService } from '../services/cell.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor(private cellService: CellService, private cellApiService: CellApiService) { }

  ngOnInit(): void {
  }

}
