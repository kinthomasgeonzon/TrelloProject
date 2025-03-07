import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(1, "Name is required")
    .refine((val) => val.trim().length > 0, {
      message: "Name cannot be empty or just spaces",
    }),
});

export type SignupFormData = z.infer<typeof signupSchema>; 
