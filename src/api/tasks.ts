// services
import { asyncSendApi } from "./services";

// types
import type { CreateTaskType, UpdateTaskType } from "../types/task.types";

export const createTaskRequest = (task: CreateTaskType) =>
  asyncSendApi({ url: "/tasks", body: JSON.stringify(task), method: "POST" });

export const getTaskRequest = () => asyncSendApi({ url: "/tasks" });

export const deleteTaskRequest = (id: string) =>
  asyncSendApi({ url: `/tasks/${id}`, method: "DELETE" });

export const updateTaskRequest = (id: string, task: UpdateTaskType) =>
  asyncSendApi({
    url: `/tasks/${id}`,
    body: JSON.stringify(task),
    method: "PUT",
  });
