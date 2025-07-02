import { z } from "zod";

export const registerSchema = z
	.object({
		username: z.string().min(1, "Username is required"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
		confirmPassword: z
			.string()
			.min(6, "Confirm Password must be at least 6 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"], // This will point the error to the confirmPassword field
	});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
