import { makeApiCall, makeAuthenticatedApiCall } from "./api";

// Type definitions
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
	_id: string;
	name: string;
	description?: string;
	maxParticipants: number;
	isPrivate: boolean;
	createdBy: {
		_id: string;
		username: string;
		email: string;
		avatarUrl: string | null;
	};
	createdAt: string;
	updatedAt: string;
	participantCount: number;
}

export interface Message {
	_id: string;
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

// Auth API
export const authAPI = {
	// Register a new user
	register: async (userData: {
		username: string;
		email: string;
		password: string;
		avatarUrl?: string;
		role?: string;
	}) => {
		return makeApiCall<{ message: string; user: User }>("/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
		});
	},

	// Login user
	login: async (credentials: { email: string; password: string }) => {
		return makeApiCall<AuthResponse>("/auth/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		});
	},

	// Get current user
	getCurrentUser: async () => {
		return makeAuthenticatedApiCall<{ user: User }>("/auth/me");
	},

	// Logout from all devices
	logoutAllDevices: async () => {
		return makeAuthenticatedApiCall<{
			message: string;
			revokedSessions: number;
		}>("/auth/logout-all");
	},

	// Get active sessions
	getActiveSessions: async () => {
		return makeAuthenticatedApiCall<{ sessions: Session[]; total: number }>(
			"/auth/sessions"
		);
	},

	// Get session statistics
	getSessionStats: async () => {
		return makeAuthenticatedApiCall<{
			activeSessions: number;
			totalSessions: number;
			userSessions: Session[];
		}>("/auth/session-stats");
	},

	// Cleanup expired sessions (admin)
	cleanupExpiredSessions: async () => {
		return makeAuthenticatedApiCall<{
			message: string;
			cleanedCount: number;
		}>("/auth/cleanup-sessions");
	},
};

// Session Management API
export const sessionAPI = {
	// Get user's active sessions
	getUserSessions: async () => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			data: {
				sessions: Session[];
				totalActiveSessions: number;
			};
		}>("/sessions");
	},

	// Logout from current session
	logout: async () => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			message: string;
		}>("/sessions/logout", {
			method: "POST",
		});
	},

	// Revoke a specific session
	revokeSession: async (sessionId: string) => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			message: string;
		}>(`/sessions/${sessionId}`, {
			method: "DELETE",
		});
	},

	// Revoke all other sessions
	revokeAllOtherSessions: async () => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			message: string;
		}>("/sessions/revoke-all-others", {
			method: "POST",
		});
	},

	// Get all sessions (Admin only)
	getAllSessions: async (page = 1, limit = 20) => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			data: {
				sessions: Session[];
				pagination: {
					page: number;
					limit: number;
					totalSessions: number;
					totalPages: number;
				};
			};
		}>(`/sessions/admin/all?page=${page}&limit=${limit}`);
	},

	// Cleanup expired sessions
	cleanupExpiredSessions: async () => {
		return makeAuthenticatedApiCall<{
			success: boolean;
			message: string;
		}>("/sessions/cleanup", {
			method: "POST",
		});
	},
};

// Rooms API
export const roomsAPI = {
	// Get all rooms
	getAllRooms: async () => {
		return makeApiCall<{
			message: string;
			rooms: Room[];
			total: number;
		}>("/rooms");
	},

	// Get room by ID
	getRoomById: async (roomId: string) => {
		return makeApiCall<{
			message: string;
			room: Room;
			participantCount: number;
			isParticipant: boolean;
		}>(`/rooms/${roomId}`);
	},

	// Create a new room
	createRoom: async (roomData: {
		name: string;
		description?: string;
		isPrivate?: boolean;
		maxParticipants?: number;
	}) => {
		return makeAuthenticatedApiCall<{
			message: string;
			room: Room;
		}>("/rooms", {
			method: "POST",
			body: JSON.stringify(roomData),
		});
	},

	// Update room
	updateRoom: async (
		roomId: string,
		roomData: {
			name?: string;
			description?: string;
			isPrivate?: boolean;
			maxParticipants?: number;
		}
	) => {
		return makeAuthenticatedApiCall<{
			message: string;
			room: Room;
		}>(`/rooms/${roomId}`, {
			method: "PUT",
			body: JSON.stringify(roomData),
		});
	},

	// Delete room
	deleteRoom: async (roomId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>(`/rooms/${roomId}`, {
			method: "DELETE",
		});
	},

	// Get room messages
	getRoomMessages: async (roomId: string, page = 1, limit = 50) => {
		return makeAuthenticatedApiCall<{
			message: string;
			messages: Message[];
			total: number;
			page: number;
			totalPages: number;
		}>(`/rooms/${roomId}/messages?page=${page}&limit=${limit}`);
	},

	// Send message to room
	sendMessage: async (
		roomId: string,
		messageData: {
			content: string;
			messageType?: "text" | "image" | "file";
		}
	) => {
		return makeAuthenticatedApiCall<{
			message: string;
			data: Message;
		}>(`/rooms/${roomId}/messages`, {
			method: "POST",
			body: JSON.stringify(messageData),
		});
	},
};

// Messages API
export const messagesAPI = {
	// Get message by ID
	getMessageById: async (messageId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
			data: Message;
		}>(`/messages/${messageId}`);
	},

	// Update message
	updateMessage: async (messageId: string, content: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
			data: Message;
		}>(`/messages/${messageId}`, {
			method: "PUT",
			body: JSON.stringify({ content }),
		});
	},

	// Delete message
	deleteMessage: async (messageId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>(`/messages/${messageId}`, {
			method: "DELETE",
		});
	},

	// Search messages in room
	searchMessages: async (roomId: string, query: string, limit = 20) => {
		return makeAuthenticatedApiCall<{
			message: string;
			query: string;
			messages: Message[];
			total: number;
		}>(
			`/messages/search/${roomId}?q=${encodeURIComponent(
				query
			)}&limit=${limit}`
		);
	},
};

// User Room Management API
export const userRoomAPI = {
	// Get user's rooms
	getUserRooms: async () => {
		return makeAuthenticatedApiCall<{
			message: string;
			rooms: Room[];
			total: number;
		}>("/user-rooms");
	},

	// Join a room
	joinRoom: async (roomId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
			userRoom: UserRoom;
		}>("/user-rooms/join", {
			method: "POST",
			body: JSON.stringify({ roomId }),
		});
	},

	// Leave a room
	leaveRoom: async (roomId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>("/user-rooms/leave", {
			method: "POST",
			body: JSON.stringify({ roomId }),
		});
	},

	// Get room participants
	getRoomParticipants: async (roomId: string, page = 1, limit = 50) => {
		return makeAuthenticatedApiCall<{
			message: string;
			participants: Array<{
				id: string;
				userId: string;
				roomId: string;
				role: string;
				joinedAt: string;
				lastSeenAt: string;
				isActive: boolean;
				user: User;
			}>;
			total: number;
			page: number;
			totalPages: number;
		}>(`/user-rooms/${roomId}/participants?page=${page}&limit=${limit}`);
	},

	// Update user role in room
	updateUserRole: async (
		roomId: string,
		userId: string,
		role: "member" | "admin" | "moderator"
	) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>(`/user-rooms/${roomId}/role`, {
			method: "PUT",
			body: JSON.stringify({ userId, role }),
		});
	},

	// Update last seen
	updateLastSeen: async (roomId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>(`/user-rooms/${roomId}/last-seen`, {
			method: "PUT",
		});
	},
};

// Users API
export const usersAPI = {
	// Get all users
	getAllUsers: async (page = 1, limit = 50) => {
		return makeAuthenticatedApiCall<{
			message: string;
			users: User[];
			total: number;
			page: number;
			totalPages: number;
		}>(`/users?page=${page}&limit=${limit}`);
	},

	// Get user by ID
	getUserById: async (userId: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
			user: User;
		}>(`/users/${userId}`);
	},

	// Update user profile
	updateProfile: async (profileData: {
		username?: string;
		email?: string;
		avatarUrl?: string;
	}) => {
		return makeAuthenticatedApiCall<{
			message: string;
			user: User;
		}>("/users/profile", {
			method: "PUT",
			body: JSON.stringify(profileData),
		});
	},

	// Change password
	changePassword: async (passwordData: {
		currentPassword: string;
		newPassword: string;
	}) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>("/users/change-password", {
			method: "PUT",
			body: JSON.stringify(passwordData),
		});
	},

	// Delete account
	deleteAccount: async (password: string) => {
		return makeAuthenticatedApiCall<{
			message: string;
		}>("/users/delete-account", {
			method: "DELETE",
			body: JSON.stringify({ password }),
		});
	},

	// Search users
	searchUsers: async (query: string, limit = 20) => {
		return makeAuthenticatedApiCall<{
			message: string;
			users: User[];
			total: number;
		}>(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
	},
};

// Export all APIs
const apiService = {
	auth: authAPI,
	sessions: sessionAPI,
	rooms: roomsAPI,
	messages: messagesAPI,
	userRooms: userRoomAPI,
	users: usersAPI,
};

export default apiService;
