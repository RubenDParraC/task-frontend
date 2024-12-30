export interface Task {
  _id: string;
  title: string;
  description?: string;
  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateTaskType = Omit<Task, "_id" | "createdAt" | "updatedAt">;

export type UpdateTaskType = Partial<Task>;
