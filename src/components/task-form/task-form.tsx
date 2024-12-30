// hooks
import { useTasks } from "../../context/use-tasks";

// schema
import { taskSchema, type TaskFormValues } from "./schema";

// types
import type { TaskFormProps } from "./types";

// external components
import { Button, Input, Text, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function TaskForm({ task }: TaskFormProps) {
  const { titleError, createTask, updateTask } = useTasks();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      done: task ? task.done : false,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    if (task) {
      await updateTask(task._id, data);
    } else {
      await createTask(data);
    }
    reset({
      title: task ? data.title : "",
      description: task ? data.description : "",
      done: data.done,
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <>
            <Field
              invalid={Boolean(errors.title?.message || titleError)}
              label="Title *"
              errorText={errors.title?.message ?? titleError}
            >
              <Input
                {...field}
                className="border-2 border-gray-700 hover:border-orange-500 focus:border-orange-500 p-2 rounded-lg bg-zinc-500 block w-full"
                placeholder="Write a title"
              />
            </Field>
          </>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <>
            <Field
              invalid={Boolean(errors.description?.message)}
              label="Description"
              errorText={errors.description?.message}
            >
              <Textarea
                {...field}
                rows={3}
                placeholder="Write a description"
                className="border-2 border-gray-700 hover:border-orange-500 focus:border-orange-500 p-2 rounded-lg bg-zinc-500 block w-full"
              />
            </Field>
          </>
        )}
      />
      <Controller
        name="done"
        control={control}
        render={({ field }) => (
          <Field
            invalid={Boolean(errors.description?.message)}
            errorText={errors.description?.message}
            className="flex flex-row items-center"
          >
            <Checkbox
              onChange={field.onChange}
              checked={field.value}
              className="bg-zinc-500 text-white w-28 p-2 rounded-lg cursor-pointer hover:bg-zinc-600"
            >
              Done
            </Checkbox>
            <Text className="text-xs">
              If you want to mark the task as completed, press the "Done"
              button.
            </Text>
          </Field>
        )}
      />
      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 px-3 block py-2 w-full mt-5 rounded-lg"
      >
        {task ? "Update Task" : "Create new task"}
      </Button>
    </form>
  );
}

export default TaskForm;
