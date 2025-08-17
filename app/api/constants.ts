export const API = {
  EXPENSE: {
    BASE: '/expense',
    BY_ID: (id: string | number) => `/expense/${id}`,
    MONTHLY_STATS: '/expense/stats/monthly',
  },
  USER_BUDGET: {
    BASE: '/user-budget',
  },
};
