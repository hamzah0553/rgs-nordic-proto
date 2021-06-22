import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from '../core/models/cell';
import { Site } from '../core/models/site';

@Component({
  selector: 'app-site-grid',
  templateUrl: './site-grid.component.html',
  styleUrls: ['./site-grid.component.css']
})
export class SiteGridComponent implements OnInit {

  @Input() public site: Site = new Site();
  @Output() tileClickEmitter = new EventEmitter<Tile>();

  public tiles: Tile[] = [];

  constructor() { }

  ngOnInit(): void {
    //if (this.site.siteGridCells == null || this.site.siteGridCells.length == 0) {
    //}
    this.site.siteGridCells = new Array<Cell>(this.site.colCount * this.site.rowCount);
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
        this.tiles.push(tile);
      }
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
