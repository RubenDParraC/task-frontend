import { useContext } from "react";

// context
import { TaskContext } from "./task-context";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("UseTasks must be used within a TaskProvider");
  return context;
};
