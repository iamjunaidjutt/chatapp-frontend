import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authAPI } from "./lib/apiService";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				try {
					const data = await authAPI.login({
						email: credentials?.email as string,
						password: credentials?.password as string,
					});

					user = {
						...data.user,
						accessToken: data.token, // Store the JWT token from our backend
					};

					if (!user) {
						throw new Error("Invalid credentials.");
					}

					return user;
				} catch (error) {
					console.error("Authentication error:", error);
					throw new Error("Invalid credentials.");
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
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
