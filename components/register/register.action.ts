import { RegisterSchemaType } from "@/utils/validators/register.schema";

const handleRegistration = async (data: RegisterSchemaType) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password,
				}),
			}
		);
		if (!response.ok) {
			throw new Error("Registration failed");
		}
	} catch (error) {
		console.error("Error occurred during registration:", error);
	}
};

export { handleRegistration };
