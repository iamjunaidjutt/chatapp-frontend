"use server";

import { revalidatePath } from "next/cache";
import { userRoomAPI, roomsAPI, messagesAPI } from "./apiService";

// Chat actions for server-side operations
export async function fetchUserRooms() {
	try {
		const data = await userRoomAPI.getUserRooms();
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
		const data = await roomsAPI.getRoomMessages(
			roomId,
			Math.floor(offset / limit) + 1,
			limit
		);
		return { success: true, data };
	} catch (error) {
		console.error("Error fetching room messages:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function sendMessage(roomId: string, content: string) {
	try {
		const data = await roomsAPI.sendMessage(roomId, {
			content,
			messageType: "text",
		});

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

export async function joinRoom(roomId: string) {
	try {
		const data = await userRoomAPI.joinRoom(roomId);

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

export async function leaveRoom(roomId: string) {
	try {
		const data = await userRoomAPI.leaveRoom(roomId);

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
	roomId: string,
	settings: { lastSeenAt?: string }
) {
	try {
		if (settings.lastSeenAt !== undefined) {
			await userRoomAPI.updateLastSeen(roomId);
		}

		return { success: true };
	} catch (error) {
		console.error("Error updating user room settings:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function createRoom(roomData: {
	name: string;
	description?: string;
	isPrivate?: boolean;
	maxParticipants?: number;
}) {
	try {
		const data = await roomsAPI.createRoom(roomData);

		// Revalidate the rooms list
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

export async function deleteMessage(messageId: string) {
	try {
		const data = await messagesAPI.deleteMessage(messageId);

		// Revalidate the page
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error deleting message:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

export async function editMessage(messageId: string, content: string) {
	try {
		const data = await messagesAPI.updateMessage(messageId, content);

		// Revalidate the page
		revalidatePath("/chat");

		return { success: true, data };
	} catch (error) {
		console.error("Error editing message:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
