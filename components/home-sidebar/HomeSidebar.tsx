"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Users, Home, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "next-auth";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/actions/auth.action";
import { routes } from "@/config/routes";
import styles from "./HomeSidebar.module.scss";

interface HomeSidebarProps {
	user: User | null;
	children: React.ReactNode;
}

export default function HomeSidebar({ user, children }: HomeSidebarProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [activeItem, setActiveItem] = useState("home");

	// Update active item based on current route
	useEffect(() => {
		if (pathname === routes.home) {
			setActiveItem("home");
		} else if (pathname.startsWith(routes.rooms)) {
			setActiveItem("rooms");
		} else if (pathname.startsWith(routes.chat)) {
			setActiveItem("chat");
		}
	}, [pathname]);

	const navigationItems = [
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

	const handleNavigation = (item: (typeof navigationItems)[0]) => {
		router.push(item.href);
	};

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="border-b border-border">
					<div className="flex items-center gap-2 px-2 py-4">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<MessageCircle className="size-4" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								ChatApp
							</span>
							<span className="truncate text-xs text-muted-foreground">
								Real-time messaging
							</span>
						</div>
					</div>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Navigation</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navigationItems.map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											onClick={() =>
												handleNavigation(item)
											}
											isActive={activeItem === item.id}
											tooltip={item.title}
										>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{user && (
						<SidebarGroup>
							<SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton tooltip="Settings">
											<Settings className="size-4" />
											<span>Settings</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)}
				</SidebarContent>

				<SidebarFooter className="border-t border-border">
					<div className="flex items-center justify-between p-2">
						<ModeToggle />
						{user ? (
							<div className="flex items-center gap-2 flex-1 ml-2">
								<Avatar className="size-8">
									<AvatarFallback>
										{user.name?.charAt(0)?.toUpperCase() ||
											user.email
												?.charAt(0)
												?.toUpperCase() ||
											"U"}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user.name || user.email}
									</span>
									{user.name && (
										<span className="truncate text-xs text-muted-foreground">
											{user.email}
										</span>
									)}
								</div>
								<form action={logoutAction}>
									<Button
										variant="ghost"
										size="sm"
										type="submit"
									>
										Logout
									</Button>
								</form>
							</div>
						) : (
							<div className="flex-1 ml-2">
								<span className="text-sm text-muted-foreground">
									Not signed in
								</span>
							</div>
						)}
					</div>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
					<SidebarTrigger className="-ml-1" />
					<div className="ml-auto">
						<ModeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col p-4 overflow-auto">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
