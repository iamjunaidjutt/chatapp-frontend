import { routes } from "@/config/routes";
import { MessageCircle, Users, Home } from "lucide-react";

export const navigationItems = [
	{
		id: "home",
		title: "Home",
		icon: Home,
		href: routes.home,
	},
	{
		id: "rooms",
		title: "Rooms",
		icon: Users,
		href: routes.rooms,
	},
	{
		id: "chat",
		title: "Chat",
		icon: MessageCircle,
		href: routes.chat,
	},
];
