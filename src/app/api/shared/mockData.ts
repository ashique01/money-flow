// Shared mock data used by the development API routes.
// In production the routes forward to the Google Apps Script backend.

export type MockAccount = {
  id: string;
  name: string;
  owner: string;
  type: string;
  balance: number;
  currency: string;
  status: 'Active' | 'Inactive';
};

// Initial mock accounts – mutable so transaction routes can update balances.
export let mockAccounts: MockAccount[] = [
  {
    id: '1',
    name: 'Checking',
    owner: 'ashiquemurad@gmail.com',
    type: 'Bank',
    balance: 1234.56,
    currency: 'USD',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Savings',
    owner: 'ashiquemurad@gmail.com',
    type: 'Bank',
    balance: 9876.54,
    currency: 'USD',
    status: 'Active',
  },
];
