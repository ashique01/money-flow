export interface Goal {

  goal_id: string;

  goal: string;

  owner: "Ash" | "Rifa" | "Shared";

  target: number;

  current: number;

  deadline: string;

  status: "Active" | "Completed" | "Cancelled";

  created_at: string;

  updated_at: string;

}



export interface CreateGoalInput {

  goal: string;

  owner: "Ash" | "Rifa" | "Shared";

  target: number;

  current: number;

  deadline: string;

  status?: "Active" | "Completed" | "Cancelled";

}