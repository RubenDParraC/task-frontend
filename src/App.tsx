// components
import TaskForm from "./components/task-form/task-form";
import TaskList from "./components/task-list/task-list";

// external components
import { Text } from "@chakra-ui/react";
import { TaskProvider } from "./context/task-context";
import { FolderPlusIcon } from "@heroicons/react/24/solid";

function App() {
  return (
    <TaskProvider>
      <div className="bg-zinc-900 min-h-screen text-white p-5 lg:p-10">
        <Text className="text-lg lg:text-3xl font-semibold lg:font-bold px-5">
          Task Manager
        </Text>
        <Text className="text-md font-medium px-5 mt-2">
          Technical Test Ruben Parra
        </Text>
        <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-[1456px]">
          <div className="w-full lg:w-1/2 p-5 flex flex-col border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-gray-400 gap-3">
            <div className="flex flex-row items-center gap-2">
              <FolderPlusIcon className="size-6 text-orange-500" />
              <Text className="text-lg font-medium">Create a new task</Text>
            </div>
            <TaskForm />
          </div>
          <div className="w-full lg:w-1/2 p-5 flex flex-col gap-3">
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
