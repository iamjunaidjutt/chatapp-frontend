import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				console.log("Credentials received:", credentials);

				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email: credentials?.email as string,
								password: credentials?.password as string,
							}),
						}
					);

					const data = await response.json();

					// Check if the response indicates success
					if (!response.ok) {
						console.log(
							"Login failed:",
							data.message || "Invalid credentials"
						);
						return null; // Return null for failed authentication
					}

					if (!data.user || !data.token) {
						console.log("No user or token found in response");
						return null; // Return null for invalid response structure
					}

					user = {
						...data.user,
						accessToken: data.token, // Store the JWT token from our backend
					};

					return user;
				} catch (error) {
					console.error("Authentication error:", error);
					return null; // Return null for any network or other errors
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 24 hours (match your backend token expiry)
	},
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.accessToken = user.accessToken; // Store the JWT token
			}

			// Check if the token is still valid (you can add more sophisticated logic here)
			if (token.accessToken) {
				try {
					// You could optionally verify the token here by making a call to your backend
					// For now, we'll rely on the backend to return 401 when the token expires
					return token;
				} catch (error) {
					console.error("Token validation error:", error);
					// Return null to force re-authentication
					return null;
				}
			}

			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.accessToken = token.accessToken as string; // Add to session
			}
			return session;
		},
	},
	trustHost: true,
});
