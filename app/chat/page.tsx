import { Suspense } from "react";

import ChatLayout from "@/components/chat/chat-layout/ChatLayout";
import ChatLoading from "@/components/chat/chat-loading/ChatLoading";

export default async function ChatPage() {
	return (
		<Suspense fallback={<ChatLoading />}>
			{/* <ChatLayout /> */}
			<p>Chat Page</p>
		</Suspense>
	);
}
