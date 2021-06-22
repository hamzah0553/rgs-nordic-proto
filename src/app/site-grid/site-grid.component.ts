import { Component, DebugEventListener, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cell } from '../core/models/cell';
import { Site } from '../core/models/site';

@Component({
  selector: 'app-site-grid',
  templateUrl: './site-grid.component.html',
  styleUrls: ['./site-grid.component.css']
})
export class SiteGridComponent implements OnInit {

  @Input() public site: Site = new Site();
  @Input() public cell: Cell = new Cell();
  @Output() tileClickEmitter = new EventEmitter<Tile>();

  public tiles: Tile[] = [];
  public colLabels: string[] = [];
  public rowLabels: string[] = [];

  constructor() { }

  ngOnInit(): void {
    //if (this.site.siteGridCells == null || this.site.siteGridCells.length == 0) {
    //}
    this.site.tiles = new Array<Cell>(this.site.colCount * this.site.rowCount);
    for (let i = 0; i < this.site.colCount; i++) {
      this.colLabels.push(String.fromCharCode(i + 65));
    }
    for (let i = 0; i < this.site.rowCount; i++) {
      this.rowLabels.push(i.toString());
    }
    this.generateTiles();
  }

  tileClicked(item: Tile) {
    this.tileClickEmitter.emit(item);
  }

  private generateTiles() {
    for (let i = 0; i < this.site.rowCount; i++) {
      for (let j = 0; j < this.site.colCount; j++) {
        let tile = new Tile();
        tile.col = j;
        tile.row = i;
        var cell = this.site.cells.find(element => {
          if (element.col == tile.col && element.row == tile.row) {
            return element;
          }
        });
        if (cell && cell.case) {
          tile.text = cell.case.caseId;
        }
        this.tiles.push(tile);
      }
    }
  }

  checkTileColor(item: Tile) {
    if (this.site.cells) {
      var element = this.site.cells.find(element => {
        if (element && element.col == item.col && element.row == item.row && element.case) {
          return true;
        }
      })
      if (element) {
        return true;
      }
      return false;
    }
  }
}

class Tile {
  col: number;
  row: number;
  colspan: number;
  rowspan: number;
  text: string;
}
