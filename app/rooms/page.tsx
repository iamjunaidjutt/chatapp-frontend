import { auth } from "@/auth";
import HomeSidebar from "@/components/home-sidebar/HomeSidebar";
import RoomsPage from "@/components/rooms/RoomsPage";

const Rooms = async () => {
	const session = await auth();
	const user = session?.user || null;

	return (
		<HomeSidebar user={user}>
			<RoomsPage user={user} />
		</HomeSidebar>
	);
};

export default Rooms;
