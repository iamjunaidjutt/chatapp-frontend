"use server";

import { auth } from "@/auth";
import { Room } from "@/types";
import { revalidatePath } from "next/cache";

export const handleLeaveRoom = async (roomId: string) => {
	const session = await auth();
	if (!session?.accessToken) {
		console.error("No access token found, cannot leave room");
		return;
	}
	try {
		// Leave the room via API
		await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/leave`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
				},
			}
		);
		revalidatePath("/rooms");
		console.log("Successfully left room:", roomId);
	} catch (error) {
		console.error("Failed to leave room:", error);
	}
};

export const handleJoinRoom = async (roomId: string) => {
	const session = await auth();
	if (!session?.accessToken) {
		console.error("No access token found, cannot join room");
		return;
	}
	try {
		// Join the room via API
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/join`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to join room");
		}
		console.log("Successfully joined room:", roomId);
		revalidatePath("/rooms");
	} catch (error) {
		console.error("Failed to join room:", error);
		// Still navigate to chat even if join fails (might already be a member)
		window.location.href = `/chat?room=${roomId}`;
	}
};

export const createRoomAction = async (formData: Room) => {
	const session = await auth();
	if (!session?.accessToken) {
		console.error("No access token found, cannot create room");
		return;
	}
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.accessToken}`,
				},
				body: JSON.stringify(formData),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to create room");
		}
		const data = await response.json();
		console.log("Room created successfully:", data);
		revalidatePath("/rooms");
		return data;
	} catch (error) {
		console.error("Failed to create room:", error);
		throw error; // Re-throw to handle in the UI
	}
};

export const getUserRooms = async () => {
	const session = await auth();
	if (!session?.accessToken) {
		console.error("No access token found, cannot get user rooms");
		return [];
	}
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/user-rooms`,
			{
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to fetch user rooms");
		}
		const data = await response.json();
		return data.rooms;
	} catch (error) {
		console.error("Failed to get user rooms:", error);
		return [];
	}
};
