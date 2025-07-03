import { messages } from "@/config/messages";
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(messages.emailIsRequired),
	password: z.string().min(6, messages.passwordMinLength),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
