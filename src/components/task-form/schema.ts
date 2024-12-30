// external components
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  done: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
