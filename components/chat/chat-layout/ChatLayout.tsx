"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import styles from "./ChatLayout.module.scss";
import { ChatRoom, ChatMessage, UserRoom } from "@/types/chat";
import Sidebar from "@/components/chat/sidebar/Sidebar";
import ChatWindow from "@/components/chat/chat-window/ChatWindow";
import OnlineStatus from "@/components/chat/online-status/OnlineStatus";
import { ModeToggle } from "@/components/theme/mode-toggle";

export default function ChatLayout() {
	const { data: session } = useSession();
	const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
	const [userRooms, setUserRooms] = useState<UserRoom[]>([]);
	const [activeTab, setActiveTab] = useState<"chats" | "settings">("chats");
	const [onlineUsers] = useState<string[]>([]);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [loading, setLoading] = useState(true);

	// Load user rooms on component mount
	const loadUserRooms = useCallback(async () => {
		try {
			const response = await fetch("/api/user-rooms");
			if (response.ok) {
				const data = await response.json();
				setUserRooms(data.userRooms);
			}
		} catch (error) {
			console.error("Error loading user rooms:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	// Load messages when room is selected
	const loadMessages = useCallback(async () => {
		if (!selectedRoom) return;

		try {
			const response = await fetch(
				`/api/rooms/${selectedRoom.id}/messages/`
			);
			if (response.ok) {
				const data = await response.json();
				setMessages(data.messages);
			}
		} catch (error) {
			console.error("Error loading messages:", error);
		}
	}, [selectedRoom]);

	useEffect(() => {
		if (session?.user?.id) {
			loadUserRooms();
		}
	}, [session, loadUserRooms]);

	useEffect(() => {
		if (selectedRoom) {
			loadMessages();
		}
	}, [selectedRoom, loadMessages]);

	const handleRoomSelect = (room: ChatRoom) => {
		setSelectedRoom(room);
	};

	const handleSendMessage = async (content: string) => {
		if (!selectedRoom || !session?.user?.id) return;

		try {
			const response = await fetch(
				`/api/rooms/${selectedRoom.id}/messages`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId: session.user.id,
						content,
						messageType: "text",
					}),
				}
			);

			if (response.ok) {
				const newMessage = await response.json();
				setMessages((prev) => [...prev, newMessage]);
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<div className={styles.loadingSpinner}>Loading...</div>
			</div>
		);
	}

	return (
		<div className={styles.chatLayout}>
			<div className={styles.sidebarContainer}>
				<Sidebar
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					userRooms={userRooms}
					selectedRoom={selectedRoom}
					onRoomSelect={handleRoomSelect}
					onlineUsers={onlineUsers}
				/>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.statusBar}>
					<OnlineStatus
						selectedRoom={selectedRoom}
						onlineUsers={onlineUsers}
					/>
					<ModeToggle />
				</div>

				<ChatWindow
					selectedRoom={selectedRoom}
					messages={messages}
					onSendMessage={handleSendMessage}
					currentUser={
						session?.user
							? {
									id:
										session.user.id ||
										session.user.email ||
										"",
									username:
										session.user.name ||
										session.user.email ||
										"Unknown",
									email: session.user.email || "",
									isOnline: true,
									createdAt: new Date(),
									updatedAt: new Date(),
							  }
							: null
					}
				/>
			</div>
		</div>
	);
}
