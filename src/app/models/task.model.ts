import { Status } from "./status.model";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}
