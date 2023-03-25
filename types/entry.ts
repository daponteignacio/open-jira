export type EntryStatusType = "pending" | "in-progress" | "finished";

export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatusType;
}
