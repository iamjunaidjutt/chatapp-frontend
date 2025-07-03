import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: credentials?.email,
							password: credentials?.password,
						}),
					}
				);

				if (!res.ok) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new Error("Invalid credentials.");
				}

				const data = await res.json();
				user = data.user;

				if (!user) {
					throw new Error("Invalid credentials.");
				}

				return user;
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
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
			}
			return session;
		},
	},
	trustHost: true,
});
