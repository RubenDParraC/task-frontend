// external components
import {
  DialogActionTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
  Text,
} from "@chakra-ui/react";
import {
  PencilSquareIcon,
  TrashIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

// components
import TaskForm from "../task-form/task-form";

// types
import type { TaskItemProps } from "./types";

// hooks
import { useTasks } from "../../context/use-tasks";

function TaskItem({ task }: TaskItemProps) {
  const { deleteTask } = useTasks();

  return (
    <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
      <div className="w-full flex flex-col gap-3 p-3 bg-orange-100 hover:bg-orange-200 hover:border-orange-500 hover:border rounded-lg">
        <div className="flex flex-row justify-between items-center">
          <Text className="text-zinc-500 font-bold">{task.title}</Text>
          <div className="flex flex-row gap-2 items-center">
            <DialogTrigger asChild>
              <PencilSquareIcon className="size-4 text-orange-500 cursor-pointer" />
            </DialogTrigger>
            <TrashIcon
              className="size-4 text-red-500 cursor-pointer"
              onClick={async () => {
                if (
                  !window.confirm("Are you sure you want to delete this task?")
                )
                  return;
                await deleteTask(task._id);
              }}
            />
          </div>
        </div>
        {task.description && (
          <Text className="text-zinc-500 font-medium">{task.description}</Text>
        )}
        <div className="flex flex-row justify-between items-center">
          <Text className="text-zinc-500 text-sm">
            {task.createdAt?.toString().slice(0, 10) ?? ""}
          </Text>
          {task.done ? (
            <div className="flex flex-row items-center gap-2">
              <CheckCircleIcon className="size-3 text-green-500 cursor-pointer" />
              <Text className="text-sm text-green-500 font-bold">
                Completed
              </Text>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <MinusCircleIcon className="size-3 text-yellow-500 cursor-pointer" />
              <Text className="text-sm text-yellow-500 font-bold">Pending</Text>
            </div>
          )}
        </div>
      </div>
      <DialogContent className="p-5">
        <DialogActionTrigger asChild>
          <XMarkIcon className="size-5 text-zinc-600 cursor-pointer self-end" />
        </DialogActionTrigger>
        <TaskForm task={task} />
      </DialogContent>
    </DialogRoot>
  );
}

export default TaskItem;
