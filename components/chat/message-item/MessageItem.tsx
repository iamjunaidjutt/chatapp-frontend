"use client";

import { formatDistanceToNow, format } from "date-fns";

import { ChatMessage } from "@/types/chat";
import styles from "./MessageItem.module.scss";

interface MessageItemProps {
	message: ChatMessage;
	isCurrentUser: boolean;
	isFirstFromUser: boolean;
}

export default function MessageItem({
	message,
	isCurrentUser,
	isFirstFromUser,
}: MessageItemProps) {
	const formatTime = (date: Date) => {
		const now = new Date();
		const messageDate = new Date(date);
		const diffInHours =
			Math.abs(now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

		if (diffInHours < 24) {
			return formatDistanceToNow(messageDate, { addSuffix: true });
		}

		return format(messageDate, "MMM d, yyyy h:mm a");
	};

	return (
		<div
			className={`${styles.messageItem} ${
				isCurrentUser ? styles.currentUser : styles.otherUser
			}`}
		>
			{isFirstFromUser && (
				<div className={styles.messageHeader}>
					<span className={styles.username}>
						{message.user?.username || "Unknown User"}
					</span>
					<span className={styles.timestamp}>
						{formatTime(message.sentAt)}
					</span>
				</div>
			)}

			<div className={styles.messageContent}>
				<div className={styles.messageBubble}>
					<p className={styles.messageText}>{message.content}</p>
					{message.isEdited && (
						<span className={styles.editedIndicator}>(edited)</span>
					)}
				</div>

				{!isFirstFromUser && (
					<div className={styles.messageTime}>
						{formatTime(message.sentAt)}
					</div>
				)}
			</div>
		</div>
	);
}
