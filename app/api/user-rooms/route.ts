import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
	try {
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// For now, return mock data - this will be replaced with actual backend integration
		const mockData = {
			userRooms: [
				{
					id: "1",
					userId: session.user.email,
					roomId: "1",
					role: "member",
					joinedAt: new Date().toISOString(),
					isActive: true,
					notifications: true,
					room: {
						id: "1",
						name: "General Chat",
						description: "General discussion room",
						isPrivate: false,
						participantCount: 5,
						isParticipant: true,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					},
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
				{
					id: "2",
					userId: session.user.email,
					roomId: "2",
					role: "admin",
					joinedAt: new Date().toISOString(),
					isActive: true,
					notifications: true,
					room: {
						id: "2",
						name: "Development",
						description: "Development team discussion",
						isPrivate: true,
						participantCount: 3,
						isParticipant: true,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					},
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
			],
		};

		return NextResponse.json(mockData);
	} catch (error) {
		console.error("Error fetching user rooms:", error);
		return NextResponse.json(
			{ error: "Failed to fetch user rooms" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body = await request.json();

		// For now, return mock success response
		return NextResponse.json({
			message: "Room joined successfully",
			userRoom: {
				id: "3",
				userId: session.user.email,
				roomId: body.roomId,
				role: "member",
				joinedAt: new Date().toISOString(),
				isActive: true,
				notifications: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error("Error joining room:", error);
		return NextResponse.json(
			{ error: "Failed to join room" },
			{ status: 500 }
		);
	}
}
