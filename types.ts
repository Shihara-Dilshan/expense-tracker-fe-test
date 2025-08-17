// types.ts
export interface Expense {
  readonly id: number;
  readonly description: string;
  readonly date: string;
  readonly type: string;
  readonly amount: number;
}

export type ExpenseInput = Omit<Expense, 'id'>;
