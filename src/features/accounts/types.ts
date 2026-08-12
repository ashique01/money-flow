export interface Account {
  id: string;

  name: string;

  owner: string;

  type: string;

  balance: number;

  currency: string;

  status: "Active" | "Inactive";
}

export interface CreateAccountInput {
  name: string;

  type: string;

  balance: number;

  currency: string;
}

export interface UpdateAccountInput {
  id: string;

  name?: string;

  type?: string;

  balance?: number;

  currency?: string;

  status?: "Active" | "Inactive";
}
