import { auth } from "@/auth";
import NavBar from "@/components/NavBar";

const Home = async () => {
	const session = await auth();
	const user = session?.user || null;

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<NavBar user={user} />
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
								Welcome to ChatApp
							</h1>
							{user ? (
								<div>
									<p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
										Hello, {user.name || user.email}!
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										You are successfully logged in.
									</p>
								</div>
							) : (
								<p className="text-lg text-gray-600 dark:text-gray-300">
									Please log in to continue.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
