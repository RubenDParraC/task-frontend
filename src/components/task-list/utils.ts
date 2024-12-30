// types
import type { Task } from "@/types/task.types";
import type { FilterType } from "./types";

export const filterOptions: {
  label: string;
  value: "all" | "done" | "pending";
}[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "done" },
  { label: "Pending", value: "pending" },
];

export const filterTasks = (tasks: Task[], filter: FilterType): Task[] => {
  return tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done === true;
    if (filter === "pending") return task.done === false;
    return true;
  });
};
