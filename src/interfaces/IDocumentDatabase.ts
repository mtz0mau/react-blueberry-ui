import { IDocumentTimes } from "interfaces/IDocumentTimes";

export interface IDocumentDatabase extends IDocumentTimes {
  id: string;
  trash: boolean;
}
