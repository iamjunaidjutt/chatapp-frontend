"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/actions/auth.action";

interface User {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

interface NavBarProps {
	user: User | null;
}

const NavBar = ({ user }: NavBarProps) => {
	return (
		<nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Brand */}
					<div className="flex items-center">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">
							Chat<span className="text-blue-500">App</span>
						</h1>
					</div>

					{/* User Info and Logout */}
					{user ? (
						<div className="flex items-center space-x-4">
							<div className="text-sm">
								<p className="text-gray-900 dark:text-white font-medium">
									{user.name || user.email}
								</p>
								{user.name && (
									<p className="text-gray-500 dark:text-gray-400 text-xs">
										{user.email}
									</p>
								)}
							</div>
							<form action={logoutAction}>
								<Button
									type="submit"
									variant="outline"
									size="sm"
									className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20"
								>
									Logout
								</Button>
							</form>
						</div>
					) : (
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Not signed in
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
