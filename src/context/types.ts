// types
import type { CreateTaskType, Task, UpdateTaskType } from "@/types/task.types";
import type { ReactNode } from "react";

export interface TaskContextValue {
  titleError: string;
  tasks: Task[];
  createTask: (task: CreateTaskType) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskType) => Promise<void>;
}

export type TaskProviderProps = {
  children: ReactNode;
};
