import { Cell } from "./cell";

export class Site {
    id: string;
    name: string;
    colCount: number;
    rowCount: number;
    tiles: Cell[];
    cells: Cell[]
}
