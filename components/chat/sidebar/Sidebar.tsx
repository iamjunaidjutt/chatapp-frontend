"use client";

import { useState } from "react";

import { ChatRoom, UserRoom } from "@/types/chat";
import styles from "./Sidebar.module.scss";
import TabNavigation from "@/components/chat/tab-navigation/TabNavigation";
import ChatList from "@/components/chat/chat-list/ChatList";
import SettingsPanel from "@/components/chat/settings-panel/SettingsPanel";

interface SidebarProps {
	activeTab: "chats" | "settings";
	setActiveTab: (tab: "chats" | "settings") => void;
	userRooms: UserRoom[];
	selectedRoom: ChatRoom | null;
	onRoomSelect: (room: ChatRoom) => void;
	onlineUsers: string[];
}

export default function Sidebar({
	activeTab,
	setActiveTab,
	userRooms,
	selectedRoom,
	onRoomSelect,
	onlineUsers,
}: SidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRooms = userRooms.filter((userRoom) =>
		userRoom.room?.name?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className={styles.sidebar}>
			<div className={styles.header}>
				<h2 className={styles.title}>Chat</h2>
				<div className={styles.searchContainer}>
					<input
						type="text"
						placeholder="Search chats..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={styles.searchInput}
					/>
				</div>
			</div>

			<TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className={styles.content}>
				{activeTab === "chats" ? (
					<ChatList
						userRooms={filteredRooms}
						selectedRoom={selectedRoom}
						onRoomSelect={onRoomSelect}
						onlineUsers={onlineUsers}
					/>
				) : (
					<SettingsPanel />
				)}
			</div>
		</div>
	);
}
