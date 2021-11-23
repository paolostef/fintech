import Movement from "src/app/models/movement";

export interface PagedMovements {
  data: Movement[];
  total: number;
}
