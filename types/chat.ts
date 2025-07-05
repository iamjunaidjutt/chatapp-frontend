export interface User {
	id: string;
	username: string;
	email: string;
	avatarUrl?: string;
	isOnline: boolean;
	lastSeen?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface Room {
	id: string;
	name?: string;
	description?: string;
	isPrivate: boolean;
	maxParticipants?: number;
	participantCount: number;
	isParticipant: boolean;
	createdBy?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Type alias for better readability
export type ChatRoom = Room;

export interface UserRoom {
	id: string;
	userId: string;
	roomId: string;
	role: "member" | "admin" | "moderator";
	joinedAt: Date;
	lastSeenAt?: Date;
	isActive: boolean;
	notifications: boolean;
	user?: User;
	room?: Room;
	createdAt: Date;
	updatedAt: Date;
}

export interface Message {
	id: string;
	content: string;
	sentAt: Date;
	userId: string;
	roomId: string;
	messageType: "text" | "image" | "file";
	isEdited: boolean;
	editedAt?: Date;
	user?: User;
	createdAt: Date;
	updatedAt: Date;
}

// Type alias for better readability
export type ChatMessage = Message;

export interface OnlineStatus {
	userId: string;
	isOnline: boolean;
	lastSeen?: Date;
}

export interface ChatState {
	currentUser: User | null;
	selectedRoom: Room | null;
	rooms: Room[];
	messages: Message[];
	onlineUsers: OnlineStatus[];
	isLoading: boolean;
	error: string | null;
}

export interface MessagePagination {
	limit: number;
	offset: number;
	total: number;
	hasMore: boolean;
}

export interface ApiResponse<T> {
	message: string;
	data?: T;
	error?: string;
}

export interface RoomsResponse {
	message: string;
	rooms: Room[];
	total: number;
}

export interface MessagesResponse {
	message: string;
	messages: Message[];
	pagination: MessagePagination;
}

export interface ParticipantsResponse {
	message: string;
	participants: UserRoom[];
	total: number;
}
