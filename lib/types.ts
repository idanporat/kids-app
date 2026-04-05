export type ProfileRole = "parent" | "child";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: ProfileRole;
  parent_id: string | null;
};

export type ChildAccount = {
  id: string;
  child_user_id: string;
  parent_id: string;
  balance: number;
  annual_interest_percent: number;
};

export type Deposit = {
  id: string;
  child_account_id: string;
  amount: number;
  note: string | null;
  created_at: string;
};
