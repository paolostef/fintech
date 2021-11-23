import { CardType } from "./card";

export interface CardForm {
  type: CardType;
  name: string;
  surname: string;
  number: string;
  csc: string;
}
