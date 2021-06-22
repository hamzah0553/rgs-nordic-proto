import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cell } from 'src/app/core/models/cell';
import { Site } from 'src/app/core/models/site';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CellApiService {

  apiBaseUrl = environment.api + "cell";
  

  constructor(private httpClient: HttpClient) { }

  public getCells() {
    return this.httpClient.get<Site[]>(this.apiBaseUrl);
  }

  public getCell(cellId: string) {
    return this.httpClient.get<Cell>(`${this.apiBaseUrl}/${cellId}`)
  }

  public postCell(cell: Cell) {
    return this.httpClient.post<Cell>(`${this.apiBaseUrl}`, cell);
  }

  public searchCell(cell: Cell) {
    return this.httpClient.post<Cell>(`${this.apiBaseUrl}/search`, cell);
  }
}
