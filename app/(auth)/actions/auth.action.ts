"use server";

import { signIn, signOut } from "@/auth";
import { LoginSchemaType } from "@/utils/validators/login.schema";
import { sessionAPI } from "@/lib/apiService";

export async function loginAction(data: LoginSchemaType) {
	console.log("Form submitted with data:", data);
	return await signIn("credentials", {
		...data,
		redirectTo: "/",
	});
}

export async function logoutAction() {
	console.log("Logout action called - enhanced version");

	// First call the backend logout endpoint using apiService
	try {
		await sessionAPI.logout();
		console.log("Backend logout endpoint called successfully");
	} catch (error) {
		console.error("Error calling backend logout endpoint:", error);
	}

	// Then call NextAuth signOut (this will redirect)
	await signOut({
		redirectTo: "/login",
	});
}
