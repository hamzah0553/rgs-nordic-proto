import { Case } from "./case";

export class Cell {
    id: string;
    col: number;
    row: number;
    caseId: string;
    siteId: string;
    case: Case;
}