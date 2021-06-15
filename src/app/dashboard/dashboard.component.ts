import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tiles: Tile[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 200; index++) {
      var tile = new Tile();
      tile.colspan = 1;
      tile.rowspan = 1;
      tile.text = "New tile";
      this.tiles.push(tile);
    }
  }

}


class Tile {
  colspan: number;
  rowspan: number;
  text: string;
}
