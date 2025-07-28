export interface User {
	id: string;
	username: string;
	email: string;
	avatarUrl?: string;
	role?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Room {
	_id?: string;
	name: string;
	description?: string;
	maxParticipants: number;
	isPrivate: boolean;
	createdBy?: {
		_id: string;
		username: string;
		email: string;
		avatarUrl: string | null;
	};
	createdAt?: string;
	updatedAt?: string;
	participantCount?: number;
}

export interface RoomWithParticipants extends Room {
	participants: UserRoom[];
}

export interface Message {
	_id?: string;
	content: string;
	sentAt: string;
	userId: string;
	roomId: string;
	messageType: "text" | "image" | "file";
	isEdited: boolean;
	editedAt?: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserRoom {
	id: string;
	userId: string;
	roomId: string;
	role: string;
	joinedAt: string;
	createdAt: string;
	updatedAt: string;
}

export interface Session {
	id: string;
	userId: string;
	userAgent: string;
	ipAddress: string;
	isActive: boolean;
	createdAt: string;
	lastUsed: string;
	expiresAt: string;
}

export interface AuthResponse {
	message: string;
	token: string;
	sessionId: string;
	expiresAt: string;
	user: User;
}
