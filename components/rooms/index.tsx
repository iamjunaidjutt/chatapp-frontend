"use client";

import { User } from "next-auth";
import { Plus, Users, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Room, userRoomAPI } from "@/lib/apiService";
import CreateRoomModal from "./CreateRoomModal";
import styles from "./RoomsPage.module.scss";

interface RoomsPageProps {
	user: User | null;
	rooms: Room[];
}

const RoomsPage = ({ user, rooms }: RoomsPageProps) => {
	// Note: user parameter available for future authentication checks
	console.log("Current user:", user);
	console.log("Rooms data:", rooms);

	const handleLeaveRoom = async (roomId: string) => {
		try {
			// Leave the room via API
			await userRoomAPI.leaveRoom(roomId);
		} catch (error) {
			console.error("Failed to leave room:", error);
		}
	};

	const handleJoinRoom = async (roomId: string) => {
		try {
			// Join the room via API
			await userRoomAPI.joinRoom(roomId);

			console.log("Successfully joined room:", roomId);
			// Navigate to chat with selected room
			window.location.href = `/chat?room=${roomId}`;
		} catch (error) {
			console.error("Failed to join room:", error);
			// Still navigate to chat even if join fails (might already be a member)
			window.location.href = `/chat?room=${roomId}`;
		}
	};

	const handleRoomCreated = () => {
		// Refresh the page to show the new room
		window.location.reload();
	};

	const formatLastActivity = (updatedAt: string) => {
		const now = new Date();
		const updated = new Date(updatedAt);
		const diffInMinutes = Math.floor(
			(now.getTime() - updated.getTime()) / (1000 * 60)
		);

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
		if (diffInMinutes < 1440)
			return `${Math.floor(diffInMinutes / 60)} hours ago`;
		return `${Math.floor(diffInMinutes / 1440)} days ago`;
	};

	return (
		<main className={styles.container}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>Chat Rooms</h1>
					<p className={styles.subtitle}>
						Join existing rooms or create your own
					</p>
				</div>
				<CreateRoomModal onRoomCreated={handleRoomCreated}>
					<Button className={styles.createButton}>
						<Plus className="w-4 h-4 mr-2" />
						Create Room
					</Button>
				</CreateRoomModal>
			</div>

			<div className={styles.roomsGrid}>
				{rooms.map((room) => (
					<Card key={room._id} className={styles.roomCard}>
						<CardHeader>
							<div className={styles.cardHeader}>
								<CardTitle className={styles.roomName}>
									{room.name}
								</CardTitle>
								<Badge
									variant={
										room.isPrivate ? "secondary" : "default"
									}
									className={styles.badge}
								>
									{room.isPrivate ? "Private" : "Public"}
								</Badge>
							</div>
							{room.description && (
								<CardDescription className={styles.description}>
									{room.description}
								</CardDescription>
							)}
						</CardHeader>
						<CardContent>
							<div className={styles.roomInfo}>
								<div className={styles.participants}>
									<Users className="w-4 h-4" />
									<span>
										{room.participantCount} /{" "}
										{room.maxParticipants} members
									</span>
								</div>
								<div className={styles.lastActivity}>
									<span>
										Last activity:{" "}
										{formatLastActivity(room.updatedAt)}
									</span>
								</div>
								<div className={styles.createdBy}>
									<span className="text-xs text-muted-foreground">
										Created by: {room.createdBy.username}
									</span>
								</div>
							</div>
							<Button
								onClick={() =>
									user?.id === room.createdBy._id
										? handleLeaveRoom(room._id)
										: handleJoinRoom(room._id)
								}
								className={styles.joinButton}
								variant="outline"
							>
								<MessageCircle className="w-4 h-4 mr-2" />
								{user?.id === room.createdBy._id
									? "Leave Room"
									: "Join Room"}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

			{rooms.length === 0 && (
				<div className={styles.emptyState}>
					<Users className="w-12 h-12 text-muted-foreground mb-4" />
					<h3 className={styles.emptyTitle}>No rooms found</h3>
					<p className={styles.emptyDescription}>
						Create your first room to get started
					</p>
					<CreateRoomModal onRoomCreated={handleRoomCreated}>
						<Button className="mt-4">
							<Plus className="w-4 h-4 mr-2" />
							Create Room
						</Button>
					</CreateRoomModal>
				</div>
			)}
		</main>
	);
};

export default RoomsPage;
