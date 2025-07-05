"use client";

import { ChatRoom } from "@/types/chat";
import styles from "./OnlineStatus.module.scss";

interface OnlineStatusProps {
	selectedRoom: ChatRoom | null;
	onlineUsers: string[];
}

export default function OnlineStatus({
	selectedRoom,
	onlineUsers,
}: OnlineStatusProps) {
	if (!selectedRoom) {
		return (
			<div className={styles.onlineStatus}>
				<span className={styles.statusText}>No room selected</span>
			</div>
		);
	}

	const onlineCount = onlineUsers.length;
	const totalParticipants = selectedRoom.participantCount;

	return (
		<div className={styles.onlineStatus}>
			<div className={styles.statusIndicator}>
				<span className={styles.onlineIcon}>🟢</span>
				<span className={styles.statusText}>
					{onlineCount} of {totalParticipants} online
				</span>
			</div>

			<div className={styles.roomDetails}>
				<span className={styles.roomType}>
					{selectedRoom.isPrivate ? "🔒 Private" : "🌐 Public"}
				</span>
				{selectedRoom.description && (
					<span className={styles.roomDescription}>
						{selectedRoom.description}
					</span>
				)}
			</div>
		</div>
	);
}
