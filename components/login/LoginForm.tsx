"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import styles from "./login.module.scss";
import {
	loginSchema,
	LoginSchemaType,
} from "@/utilities/validation/login.schema";
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

const LoginForm = () => {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submit = async (data: LoginSchemaType) => {
		console.log("Form submitted with data:", data);
		// Handle form submission logic here
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className={styles.form}>
				<h3 className={styles.title}>Login</h3>
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
							<Link href="/register" className="text-blue-500">
								Register
							</Link>
						</FormDescription>
					</FormControl>
				</FormItem>
				<Button type="submit" className={styles.btn}>
					Login
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
