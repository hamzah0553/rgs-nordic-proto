import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tiles: Tile[] = [];
  public gridCol = 20;

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 200; index++) {
      var tile = new Tile();
      tile.colspan = 1;
      tile.rowspan = 1;
      tile.text = "New tile";
      this.tiles.push(tile);
    }
    let innerWidth = window.innerWidth;
    if (innerWidth < 480) {
      this.gridCol = 10;
    }
  }

  public onResize(event) {
    let innerWidth = event.target.innerWidth;
    console.log(innerWidth);
    if (768 > innerWidth) {
      this.gridCol = 5;
    }

    if (1024 > innerWidth && innerWidth > 768) {
      this.gridCol = 10;
    }
    
    if (innerWidth > 1024) {
      this.gridCol = 20;
    }
  }

}


class Tile {
  colspan: number;
  rowspan: number;
  text: string;
}
