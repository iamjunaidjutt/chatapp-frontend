"use client";

import styles from "./MessageList.module.scss";
import { ChatMessage, User } from "@/types/chat";
import MessageItem from "@/components/chat/message-item/MessageItem";

interface MessageListProps {
	messages: ChatMessage[];
	currentUser: User | null;
}

export default function MessageList({
	messages,
	currentUser,
}: MessageListProps) {
	if (messages.length === 0) {
		return (
			<div className={styles.emptyMessages}>
				<div className={styles.emptyIcon}>💬</div>
				<p className={styles.emptyText}>
					No messages yet. Start the conversation!
				</p>
			</div>
		);
	}

	return (
		<div className={styles.messageList}>
			{messages.map((message, index) => {
				const isCurrentUser = message.userId === currentUser?.id;
				const previousMessage = index > 0 ? messages[index - 1] : null;
				const isFirstFromUser =
					!previousMessage ||
					previousMessage.userId !== message.userId;

				return (
					<MessageItem
						key={message.id}
						message={message}
						isCurrentUser={isCurrentUser}
						isFirstFromUser={isFirstFromUser}
					/>
				);
			})}
		</div>
	);
}
