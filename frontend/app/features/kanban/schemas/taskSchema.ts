import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  assignedTo: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().positive("Invalid user ID").optional()
  ),
});

export type TaskSchema = z.infer<typeof taskSchema>;
