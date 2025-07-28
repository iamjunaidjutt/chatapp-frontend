import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import HomeSidebar from "@/components/home-sidebar/HomeSidebar";
import RoomsPage from "@/components/rooms";
import { RoomWithParticipants } from "@/types";

const Rooms = async () => {
	const session = await auth();
	if (!session?.user) {
		console.log("No session found, redirecting to login...");
		await signOut();
		redirect("/login");
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/participants`,
		{
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
			},
			cache: "force-cache",
			next: { revalidate: 60 },
		}
	);
	const rooms: { rooms: RoomWithParticipants[] } = await res.json();

	return (
		<HomeSidebar user={session.user}>
			<RoomsPage user={session.user} rooms={rooms.rooms || []} />
		</HomeSidebar>
	);
};

export default Rooms;
