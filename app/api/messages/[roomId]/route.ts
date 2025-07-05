import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// Fixed: Updated to await params for Next.js 15 compatibility
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ roomId: string }> }
) {
	try {
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const { roomId } = await params;

		// For now, return mock messages data
		const mockMessages = [
			{
				id: "1",
				content: "Hello everyone! Welcome to the chat room.",
				sentAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
				userId: "user1",
				roomId: roomId,
				messageType: "text",
				isEdited: false,
				user: {
					id: "user1",
					username: "John Doe",
					email: "john@example.com",
					isOnline: true,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
				createdAt: new Date(Date.now() - 3600000).toISOString(),
				updatedAt: new Date(Date.now() - 3600000).toISOString(),
			},
			{
				id: "2",
				content: "Hey! Thanks for having me here.",
				sentAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
				userId: "user2",
				roomId: roomId,
				messageType: "text",
				isEdited: false,
				user: {
					id: "user2",
					username: "Jane Smith",
					email: "jane@example.com",
					isOnline: false,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				},
				createdAt: new Date(Date.now() - 1800000).toISOString(),
				updatedAt: new Date(Date.now() - 1800000).toISOString(),
			},
			{
				id: "3",
				content: "How is everyone doing today?",
				sentAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
				userId: session.user.email,
				roomId: roomId,
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
				createdAt: new Date(Date.now() - 900000).toISOString(),
				updatedAt: new Date(Date.now() - 900000).toISOString(),
			},
		];

		return NextResponse.json({
			messages: mockMessages,
			pagination: {
				limit: 50,
				offset: 0,
				total: mockMessages.length,
				hasMore: false,
			},
		});
	} catch (error) {
		console.error("Error fetching messages:", error);
		return NextResponse.json(
			{ error: "Failed to fetch messages" },
			{ status: 500 }
		);
	}
}
