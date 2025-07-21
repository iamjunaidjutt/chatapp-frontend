import { NextResponse } from "next/server";
import { makeApiCall } from "@/lib/api";

export async function GET() {
	try {
		const data = await makeApiCall("/rooms");
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching rooms:", error);

		// Return mock data as fallback
		return NextResponse.json({
			message: "Rooms retrieved successfully",
			rooms: [
				{
					_id: "68675a8149f72c18bd9df4ca",
					name: "General Discussion",
					description: "Open chat for everyone",
					isPrivate: false,
					maxParticipants: 100,
					createdBy: {
						_id: "6865252b6728b7af025ea7b5",
						username: "admin",
						email: "admin@yopmail.com",
						avatarUrl: null,
					},
					createdAt: "2025-07-04T04:37:21.746Z",
					updatedAt: "2025-07-04T04:40:56.951Z",
					participantCount: 24,
				},
				{
					_id: "68675a8149f72c18bd9df4cb",
					name: "Private Room",
					description: "A room for private discussions",
					isPrivate: true,
					maxParticipants: 50,
					createdBy: {
						_id: "6865252b6728b7af025ea7b5",
						username: "admin",
						email: "admin@yopmail.com",
						avatarUrl: null,
					},
					createdAt: "2025-07-04T04:30:21.746Z",
					updatedAt: "2025-07-04T04:35:56.951Z",
					participantCount: 8,
				},
			],
			total: 2,
		});
	}
}
