export type CardType = "visa" | "mastercard"

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: CardType;
  amount: number;
}

