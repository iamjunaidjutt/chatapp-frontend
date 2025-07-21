import { auth } from "@/auth";

export interface ApiResponse<T = unknown> {
	message: string;
	data?: T;
	error?: string;
}

export async function makeApiCall<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const session = await auth();
	const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
	console.log("backend makeapicall: ", backendUrl);

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...((options.headers as Record<string, string>) || {}),
	};

	// Add authentication headers if user is logged in
	if (session?.accessToken) {
		headers["Authorization"] = `Bearer ${session.accessToken}`;
	}

	const response = await fetch(`${backendUrl}/api${endpoint}`, {
		...options,
		headers,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`API call failed: ${response.status} ${errorText}`);
	}

	return await response.json();
}

export async function makeAuthenticatedApiCall<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const session = await auth();

	if (!session?.user) {
		throw new Error("Authentication required");
	}

	return makeApiCall<T>(endpoint, options);
}
