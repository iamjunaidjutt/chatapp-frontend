"use server";

import { auth, signIn, signOut } from "@/auth";
import { LoginSchemaType } from "@/utils/validators/login.schema";

export async function loginAction(data: LoginSchemaType) {
	console.log("Form submitted with data:", data);
	try {
		return await signIn("credentials", {
			...data,
			redirectTo: "/",
		});
	} catch (error) {
		console.error("Login action error:", error);
		// Check if it's a credentials error
		if (
			error &&
			typeof error === "object" &&
			"type" in error &&
			error.type === "CredentialsSignin"
		) {
			throw new Error("Invalid email or password");
		}
		// Re-throw other errors
		throw error;
	}
}

export async function logoutAction() {
	const user = await auth();
	if (!user) {
		console.log("No user is currently authenticated.");
		return;
	}
	console.log("Logout action called - enhanced version");

	// First call the backend logout endpoint using apiService
	try {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.accessToken}`,
			},
		});
		console.log("Backend logout endpoint called successfully");
	} catch (error) {
		console.error("Error calling backend logout endpoint:", error);
	}

	// Then call NextAuth signOut (this will redirect)
	await signOut({
		redirectTo: "/login",
	});
}
