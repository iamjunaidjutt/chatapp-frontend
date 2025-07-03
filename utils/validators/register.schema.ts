import { messages } from "@/config/messages";
import { z } from "zod";

export const registerSchema = z
	.object({
		username: z.string().min(1, messages.usernameIsRequired),
		email: z.string().email(messages.invalidEmail),
		password: z.string().min(6, messages.passwordMinLength),
		confirmPassword: z.string().min(6, messages.confirmPasswordMinLength),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: messages.passwordNotMatch,
		path: ["confirmPassword"], // This will point the error to the confirmPassword field
	});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
