"use server";

import { revalidatePath } from "next/cache";

// Chat actions for server-side operations
export async function fetchUserRooms(userId: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user-rooms`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`, // This should be replaced with proper auth
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch user rooms");
		}

		const data = await response.json();
		return { success: true, data };
	} catch (error) {
		console.error("Error fetching user rooms:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function fetchRoomMessages(
	roomId: string,
	limit = 50,
	offset = 0
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/messages/${roomId}?limit=${limit}&offset=${offset}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch room messages");
		}

		const data = await response.json();
		return { success: true, data };
	} catch (error) {
		console.error("Error fetching room messages:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function sendMessage(
	roomId: string,
	content: string,
	userId: string
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/messages`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`, // This should be replaced with proper auth
				},
				body: JSON.stringify({
					roomId,
					content,
					messageType: "text",
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to send message");
		}

		const data = await response.json();

		// Revalidate the messages for this room
		revalidatePath(`/chat/${roomId}`);

		return { success: true, data };
	} catch (error) {
		console.error("Error sending message:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function joinRoom(roomId: string, userId: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user-rooms/join`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`,
				},
				body: JSON.stringify({
					roomId,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to join room");
		}

		const data = await response.json();

		// Revalidate the user's rooms
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error joining room:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function leaveRoom(roomId: string, userId: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user-rooms/leave`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`,
				},
				body: JSON.stringify({
					roomId,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to leave room");
		}

		const data = await response.json();

		// Revalidate the user's rooms
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error leaving room:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function updateUserRoomSettings(
	userRoomId: string,
	settings: {
		notifications?: boolean;
		role?: string;
	}
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/user-rooms/${userRoomId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(settings),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to update room settings");
		}

		const data = await response.json();

		// Revalidate the user's rooms
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error updating room settings:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function createRoom(
	roomData: {
		name: string;
		description?: string;
		isPrivate: boolean;
		maxParticipants?: number;
	},
	userId: string
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/rooms`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`,
				},
				body: JSON.stringify(roomData),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create room");
		}

		const data = await response.json();

		// Revalidate the user's rooms
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error creating room:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function deleteMessage(messageId: string, userId: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${userId}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete message");
		}

		return { success: true };
	} catch (error) {
		console.error("Error deleting message:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function editMessage(
	messageId: string,
	content: string,
	userId: string
) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/messages/${messageId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userId}`,
				},
				body: JSON.stringify({
					content,
				}),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to edit message");
		}

		const data = await response.json();
		return { success: true, data };
	} catch (error) {
		console.error("Error editing message:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
