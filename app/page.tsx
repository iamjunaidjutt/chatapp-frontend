import { auth } from "@/auth";
import HomeSidebar from "@/components/home-sidebar/HomeSidebar";
import Home from "@/components/home/Home";

const HomePage = async () => {
	const session = await auth();
	const user = session?.user || null;

	return (
		<HomeSidebar user={user}>
			<Home user={user} />
		</HomeSidebar>
	);
};

export default HomePage;
