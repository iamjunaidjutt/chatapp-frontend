export const routes = {
	home: "/",
	login: "/login",
	register: "/register",
	logout: "/logout",
	rooms: "/rooms",
	chat: "/chat",
	resetPassword: "reset-password",
	resetEmailSent: "reset-email-sent",
	leads: {
		root: "/leads",
		id(id: string) {
			return `/leads/${id}`;
		},
		scheduleBooking(id: string) {
			return `/leads/${id}/schedule-booking`;
		},
		new: {
			root: "/leads/new",
			id(id: string) {
				return `/leads/new/${id}`;
			},
			scheduleBooking(id: string) {
				return `/leads/new/${id}/schedule-booking`;
			},
		},
		ongoing: {
			root: "/leads/ongoing",
			id(id: string) {
				return `/leads/ongoing/${id}`;
			},
			manageBooking(id: string) {
				return `/leads/ongoing/${id}/manage-booking`;
			},
			customerHistory(id: string, customer: string) {
				return `/leads/ongoing/${id}/manage-booking/${customer}`;
			},
		},
		lost: "/leads/lost",
		won: {
			root: "/leads/won",
			id(id: string) {
				return `/leads/won/${id}`;
			},
			scheduleBooking(id: string) {
				return `/leads/won/${id}/schedule-booking`;
			},
		},
		followUp: "/leads/follow-up",
	},
};
