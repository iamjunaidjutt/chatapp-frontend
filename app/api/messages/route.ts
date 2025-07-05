import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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
		const { roomId, content } = body;

		if (!roomId || !content) {
			return NextResponse.json(
				{ error: "Room ID and content are required" },
				{ status: 400 }
			);
		}

		// For now, return mock message data
		const newMessage = {
			id: `msg_${Date.now()}`,
			content,
			sentAt: new Date().toISOString(),
			userId: session.user.email,
			roomId,
			messageType: "text",
			isEdited: false,
			user: {
				id: session.user.email,
				username: session.user.name || "You",
				email: session.user.email,
				isOnline: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		return NextResponse.json(newMessage);
	} catch (error) {
		console.error("Error sending message:", error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
