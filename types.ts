// types.ts
export interface Expense {
  readonly _id: number;
  readonly description: string;
  readonly date: string;
  readonly type: string;
  readonly amount: number;
}

export type ExpenseInput = Omit<Expense, '_id'>;
