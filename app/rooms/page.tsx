import { auth } from "@/auth";
import HomeSidebar from "@/components/home-sidebar/HomeSidebar";
import RoomsPage from "@/components/rooms";

const Rooms = async () => {
	const session = await auth();
	const user = session?.user || null;
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});
	if (!data.ok) {
		console.error("Failed to fetch rooms");
		throw new Error("Failed to fetch rooms");
	}

	const rooms = await data.json();

	console.log("Session in Rooms page: ", session);
	console.log("User in Rooms page: ", user);
	console.log("Rooms in Rooms page: ", rooms);

	return (
		<HomeSidebar user={user}>
			<RoomsPage user={user} rooms={rooms.rooms || []} />
		</HomeSidebar>
	);
};

export default Rooms;
