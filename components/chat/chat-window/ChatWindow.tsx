"use client";

import { useRef, useEffect } from "react";

import { ChatRoom, ChatMessage, User } from "@/types/chat";
import MessageList from "@/components/chat/message-list/MessageList";
import MessageInput from "@/components/chat/message-input/MessageInput";
import styles from "./ChatWindow.module.scss";

interface ChatWindowProps {
	selectedRoom: ChatRoom | null;
	messages: ChatMessage[];
	onSendMessage: (content: string) => void;
	currentUser: User | null;
}

export default function ChatWindow({
	selectedRoom,
	messages,
	onSendMessage,
	currentUser,
}: ChatWindowProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = (content: string) => {
		if (content.trim()) {
			onSendMessage(content);
		}
	};

	if (!selectedRoom) {
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyIcon}>💬</div>
				<h3 className={styles.emptyTitle}>
					Select a chat to start messaging
				</h3>
				<p className={styles.emptyDescription}>
					Choose a room from the sidebar to view and send messages
				</p>
			</div>
		);
	}

	return (
		<div className={styles.chatWindow}>
			<div className={styles.chatHeader}>
				<div className={styles.roomInfo}>
					<h3 className={styles.roomName}>
						{selectedRoom.name ||
							`Room ${selectedRoom.id.slice(0, 8)}`}
					</h3>
					<span className={styles.participantCount}>
						{selectedRoom.participantCount} members
					</span>
				</div>
				<div className={styles.chatActions}>
					<button className={styles.actionButton} title="Room info">
						ℹ️
					</button>
					<button className={styles.actionButton} title="Call">
						📞
					</button>
					<button className={styles.actionButton} title="Settings">
						⚙️
					</button>
				</div>
			</div>

			<div className={styles.messagesContainer}>
				<MessageList messages={messages} currentUser={currentUser} />
				<div ref={messagesEndRef} />
			</div>

			<div className={styles.messageInputContainer}>
				<MessageInput
					onSendMessage={handleSendMessage}
					disabled={!selectedRoom}
					placeholder={`Message ${selectedRoom.name || "room"}...`}
				/>
			</div>
		</div>
	);
}
