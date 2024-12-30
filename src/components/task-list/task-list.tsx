import { useState } from "react";
import {
  Button,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FunnelIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import TaskItem from "../task-item/task-item";
import { useTasks } from "../../context/use-tasks";
import { filterOptions, filterTasks } from "./utils";
import type { FilterType } from "./types";
import type { Task } from "../../types/task.types";

function TaskList() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<FilterType>("all");
  const filteredTasks = filterTasks(tasks || [], filter);

  return (
    <PopoverRoot>
      <div className="w-full flex flex-col gap-3">
        <PopoverTrigger asChild>
          <div className="flex flex-row items-center gap-2 cursor-pointer max-w-min">
            <FunnelIcon className="size-6 text-orange-500" />
            <Text className="text-lg font-medium">Filter</Text>
            <ChevronDownIcon className="size-3 text-orange-500" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-5">
          <div className="flex flex-col gap-4 max-w-[80%] self-center">
            {filterOptions.map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-2 ${
                  filter === value ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </PopoverContent>

        {filteredTasks.map((task: Task) => (
          <TaskItem key={`task-${task._id}`} task={task} />
        ))}
      </div>
    </PopoverRoot>
  );
}

export default TaskList;
