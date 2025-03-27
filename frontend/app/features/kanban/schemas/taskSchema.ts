import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.string().optional(),
  taskOrder: z.number().optional(),
  assignedTo: z.string().nullable().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
