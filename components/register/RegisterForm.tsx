"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./register.module.scss";
import {
	registerSchema,
	RegisterSchemaType,
} from "@/utils/validators/register.schema";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { routes } from "@/config/routes";
import { handleRegistration } from "./register.action";

const RegisterForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const submit = async (data: RegisterSchemaType) => {
		console.log("Form submitted with data:", data);
		setIsLoading(true);
		await handleRegistration(data);
		data.username = "";
		data.email = "";
		data.password = "";
		data.confirmPassword = "";
		setIsLoading(false);
		router.push(routes.login);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className={styles.form}>
				<h3 className={styles.title}>Create Account</h3>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="you@example.com"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your email address.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Your password must be at least 8 characters
								long.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Please re-enter your password.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormItem>
					<FormControl>
						<FormDescription>
							Already have an account?{" "}
							<Link href={routes.login} className="text-blue-500">
								Log in
							</Link>
						</FormDescription>
					</FormControl>
				</FormItem>
				<Button
					type="submit"
					className={styles.btn}
					disabled={isLoading}
				>
					{isLoading ? "Registering..." : "Register"}
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
