export type ActionType =
  | "CREATE_EVENT"
  | "UPDATE_EVENT"
  | "MOVE_EVENT"
  | "DELETE_EVENT";

export type ActionStatus =
  | "PROPOSED"
  | "CONFIRMED"
  | "APPLIED"
  | "REVERTED"
  | "FAILED";

export type ImportanceLabel = "LOW" | "MEDIUM" | "HIGH";
