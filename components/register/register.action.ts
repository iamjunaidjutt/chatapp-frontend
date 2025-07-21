import { RegisterSchemaType } from "@/utils/validators/register.schema";
import { authAPI } from "@/lib/apiService";

const handleRegistration = async (data: RegisterSchemaType) => {
	try {
		await authAPI.register({
			username: data.username,
			email: data.email,
			password: data.password,
		});
		console.log("Registration successful");
	} catch (error) {
		console.error("Error occurred during registration:", error);
		throw error; // Re-throw to let the form handle the error
	}
};

export { handleRegistration };
