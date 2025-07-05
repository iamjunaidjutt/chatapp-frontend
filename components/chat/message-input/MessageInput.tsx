"use client";

import { useState, useRef, KeyboardEvent } from "react";

import styles from "./MessageInput.module.scss";

interface MessageInputProps {
	onSendMessage: (content: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

export default function MessageInput({
	onSendMessage,
	disabled = false,
	placeholder = "Type a message...",
}: MessageInputProps) {
	const [message, setMessage] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSend = () => {
		if (message.trim() && !disabled) {
			onSendMessage(message.trim());
			setMessage("");
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
			}
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);

		// Auto-resize textarea
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(
				textareaRef.current.scrollHeight,
				120
			)}px`;
		}
	};

	return (
		<div className={styles.messageInput}>
			<div className={styles.inputContainer}>
				<button
					className={styles.attachButton}
					type="button"
					title="Attach file"
					disabled={disabled}
				>
					📎
				</button>

				<textarea
					ref={textareaRef}
					value={message}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					disabled={disabled}
					className={styles.textarea}
					rows={1}
				/>

				<button
					className={styles.emojiButton}
					type="button"
					title="Add emoji"
					disabled={disabled}
				>
					😊
				</button>
			</div>

			<button
				onClick={handleSend}
				disabled={!message.trim() || disabled}
				className={styles.sendButton}
				title="Send message"
			>
				<span className={styles.sendIcon}>🚀</span>
			</button>
		</div>
	);
}
