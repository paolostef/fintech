export interface TransferForm {
  name: string;
  surname: string;
  iban: string;
  amountAndCard: {
    amount: number;
    cardId: string;
  }
}
