"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./login.module.scss";
import { loginSchema, LoginSchemaType } from "@/utils/validators/login.schema";
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
import { loginAction } from "@/app/(auth)/actions/auth.action";

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submit = async (data: LoginSchemaType) => {
		console.log("Form submitted with data:", data);
		setIsLoading(true);
		setError(null); // Clear previous errors
		try {
			await loginAction(data);
		} catch (error) {
			console.error("Login error:", error);
			setError(
				error instanceof Error
					? error.message
					: "Login failed. Please try again."
			);
		}
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className={styles.form}>
				<h3 className={styles.title}>Login</h3>
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}
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
				<FormItem>
					<FormControl>
						<FormDescription>
							Don&#39;t have an account already?{" "}
							<Link
								href={routes.register}
								className="text-blue-500"
							>
								Register
							</Link>
						</FormDescription>
					</FormControl>
				</FormItem>
				<Button
					type="submit"
					className={styles.btn}
					disabled={isLoading}
				>
					{isLoading ? "Logging in..." : "Log in"}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
