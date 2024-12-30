import { createContext, type FC, useState, useEffect } from "react";

// api
import {
  createTaskRequest,
  getTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

// types
import type { CreateTaskType, Task, UpdateTaskType } from "../types/task.types";
import type { TaskContextValue, TaskProviderProps } from "./types";

export const TaskContext = createContext<TaskContextValue>({
  titleError: "",
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {},
});

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleError, setTitleError] = useState<string>("");

  useEffect(() => {
    getTaskRequest()
      .then((response) => response?.json())
      .then((data) => setTasks(data));
  }, []);

  const createTask = async (task: CreateTaskType) => {
    const res = await createTaskRequest(task);
    const data = await res?.json();
    if (res?.ok) {
      setTasks([...tasks, data]);
    } else {
      setTitleError(data.message);
    }
  };

  const deleteTask = async (id: string) => {
    const res = await deleteTaskRequest(id);
    if (res?.ok) setTasks(tasks.filter((task: Task) => task._id !== id));
  };

  const updateTask = async (id: string, task: UpdateTaskType) => {
    const res = await updateTaskRequest(id, task);
    const currentItem: Task = tasks.filter((task: Task) => task._id === id)[0];
    currentItem.title = task.title ?? currentItem.title;
    currentItem.description = task.description ?? currentItem.description;
    currentItem.done = task.done ?? currentItem.done;

    if (res?.ok) {
      setTasks(
        tasks.map((task: Task) =>
          task._id === id ? { ...task, ...currentItem } : task
        )
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, titleError, createTask, deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
