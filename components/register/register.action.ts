import { RegisterSchemaType } from "@/utils/validators/register.schema";

const handleRegistration = async (data: RegisterSchemaType) => {
	try {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
		});
		console.log("Registration successful");
	} catch (error) {
		console.error("Error occurred during registration:", error);
		throw error; // Re-throw to let the form handle the error
	}
};

export { handleRegistration };
