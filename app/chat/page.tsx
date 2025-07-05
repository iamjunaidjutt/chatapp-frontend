import { Suspense } from "react";
import { auth } from "@/auth";
import HomeSidebar from "@/components/home-sidebar/HomeSidebar";
import ChatLayout from "@/components/chat/chat-layout/ChatLayout";
import ChatLoading from "@/components/chat/chat-loading/ChatLoading";

export default async function ChatPage() {
	const session = await auth();
	const user = session?.user || null;

	return (
		<HomeSidebar user={user}>
			<Suspense fallback={<ChatLoading />}>
				<ChatLayout />
			</Suspense>
		</HomeSidebar>
	);
}
