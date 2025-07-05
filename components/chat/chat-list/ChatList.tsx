"use client";

import { ChatRoom, UserRoom } from "@/types/chat";
import styles from "./ChatList.module.scss";
import ChatListItem from "@/components/chat/chat-list-item/ChatListItem";

interface ChatListProps {
	userRooms: UserRoom[];
	selectedRoom: ChatRoom | null;
	onRoomSelect: (room: ChatRoom) => void;
	onlineUsers: string[];
}

export default function ChatList({
	userRooms,
	selectedRoom,
	onRoomSelect,
	onlineUsers,
}: ChatListProps) {
	if (userRooms.length === 0) {
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyIcon}>💬</div>
				<h3 className={styles.emptyTitle}>No chats yet</h3>
				<p className={styles.emptyDescription}>
					Join a room or create a new one to start chatting
				</p>
			</div>
		);
	}

	return (
		<div className={styles.chatList}>
			<div className={styles.listHeader}>
				<h3 className={styles.listTitle}>Your Chats</h3>
				<span className={styles.chatCount}>{userRooms.length}</span>
			</div>

			<div className={styles.listContent}>
				{userRooms.map(
					(userRoom) =>
						userRoom.room && (
							<ChatListItem
								key={userRoom.id}
								userRoom={userRoom}
								isSelected={
									selectedRoom?.id === userRoom.room.id
								}
								onSelect={() => onRoomSelect(userRoom.room!)}
								onlineUsers={onlineUsers}
							/>
						)
				)}
			</div>
		</div>
	);
}
