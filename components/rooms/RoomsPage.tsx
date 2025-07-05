"use client";

import { useState, useEffect } from "react";
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
import styles from "./RoomsPage.module.scss";

interface Room {
	id: string;
	name: string;
	description?: string;
	participantCount: number;
	lastActivity?: string;
	isPublic: boolean;
}

interface RoomsPageProps {
	user: User | null;
}

export default function RoomsPage({ user }: RoomsPageProps) {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Mock data for now - replace with actual API call
		const mockRooms: Room[] = [
			{
				id: "1",
				name: "General Discussion",
				description: "Open chat for everyone",
				participantCount: 24,
				lastActivity: "2 minutes ago",
				isPublic: true,
			},
			{
				id: "2",
				name: "Project Alpha",
				description: "Private project discussions",
				participantCount: 8,
				lastActivity: "1 hour ago",
				isPublic: false,
			},
			{
				id: "3",
				name: "Random",
				description: "Casual conversations",
				participantCount: 15,
				lastActivity: "5 minutes ago",
				isPublic: true,
			},
		];

		setTimeout(() => {
			setRooms(mockRooms);
			setLoading(false);
		}, 1000);
	}, []);

	const handleJoinRoom = (roomId: string) => {
		console.log("Joining room:", roomId);
		// Navigate to chat with selected room
		window.location.href = `/chat?room=${roomId}`;
	};

	const handleCreateRoom = () => {
		console.log("Creating new room");
		// Add room creation logic
	};

	if (loading) {
		return (
			<div className={styles.loading}>
				<div className={styles.spinner}>Loading rooms...</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>Chat Rooms</h1>
					<p className={styles.subtitle}>
						Join existing rooms or create your own
					</p>
				</div>
				<Button
					onClick={handleCreateRoom}
					className={styles.createButton}
				>
					<Plus className="w-4 h-4 mr-2" />
					Create Room
				</Button>
			</div>

			<div className={styles.roomsGrid}>
				{rooms.map((room) => (
					<Card key={room.id} className={styles.roomCard}>
						<CardHeader>
							<div className={styles.cardHeader}>
								<CardTitle className={styles.roomName}>
									{room.name}
								</CardTitle>
								<Badge
									variant={
										room.isPublic ? "default" : "secondary"
									}
									className={styles.badge}
								>
									{room.isPublic ? "Public" : "Private"}
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
									<span>{room.participantCount} members</span>
								</div>
								{room.lastActivity && (
									<div className={styles.lastActivity}>
										<span>
											Last activity: {room.lastActivity}
										</span>
									</div>
								)}
							</div>
							<Button
								onClick={() => handleJoinRoom(room.id)}
								className={styles.joinButton}
								variant="outline"
							>
								<MessageCircle className="w-4 h-4 mr-2" />
								Join Room
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
					<Button onClick={handleCreateRoom} className="mt-4">
						<Plus className="w-4 h-4 mr-2" />
						Create Room
					</Button>
				</div>
			)}
		</div>
	);
}
