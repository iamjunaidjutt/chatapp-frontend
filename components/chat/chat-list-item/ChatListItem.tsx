"use client";

import { formatDistanceToNow } from "date-fns";

import { UserRoom } from "@/types/chat";
import styles from "./ChatListItem.module.scss";

interface ChatListItemProps {
	userRoom: UserRoom;
	isSelected: boolean;
	onSelect: () => void;
	onlineUsers: string[];
}

export default function ChatListItem({
	userRoom,
	isSelected,
	onSelect,
	onlineUsers,
}: ChatListItemProps) {
	const room = userRoom.room;
	const isOnline = room ? onlineUsers.includes(room.id) : false;

	if (!room) {
		return null;
	}

	const lastSeenText = userRoom.lastSeenAt
		? formatDistanceToNow(new Date(userRoom.lastSeenAt), {
				addSuffix: true,
		  })
		: "Never";

	return (
		<div
			className={`${styles.chatListItem} ${
				isSelected ? styles.selected : ""
			}`}
			onClick={onSelect}
		>
			<div className={styles.roomInfo}>
				<div className={styles.roomHeader}>
					<h4 className={styles.roomName}>
						{room.name || `Room ${room.id.slice(0, 8)}`}
					</h4>
					<div className={styles.roomMeta}>
						<span className={styles.participantCount}>
							{room.participantCount} members
						</span>
						{isOnline && (
							<span className={styles.onlineIndicator} />
						)}
					</div>
				</div>

				<div className={styles.roomDetails}>
					<div className={styles.roomDescription}>
						{room.description || "No description"}
					</div>
					<div className={styles.roomStats}>
						<span className={styles.role}>{userRoom.role}</span>
						<span className={styles.lastSeen}>
							Last seen {lastSeenText}
						</span>
					</div>
				</div>
			</div>

			{userRoom.notifications && (
				<div className={styles.notificationBadge}>
					<span className={styles.notificationIcon}>🔔</span>
				</div>
			)}
		</div>
	);
}
