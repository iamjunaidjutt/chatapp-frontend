"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/actions/auth.action";
import { ModeToggle } from "@/components/theme/mode-toggle";
import styles from "./NavBar.module.scss";

interface User {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

interface NavBarProps {
	user: User | null;
}

export default function NavBar({ user }: NavBarProps) {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.content}>
					{/* Logo/Brand */}
					<div className={styles.brand}>
						<h1 className={styles.logo}>
							Chat<span className={styles.logoAccent}>App</span>
						</h1>
					</div>

					{/* Right side - Theme toggle and user section */}
					<div className={styles.rightSection}>
						<ModeToggle />
						{user ? (
							<div className={styles.userSection}>
								<div className={styles.userInfo}>
									<p className={styles.userName}>
										{user.name || user.email}
									</p>
									{user.name && (
										<p className={styles.userEmail}>
											{user.email}
										</p>
									)}
								</div>
								<form action={logoutAction}>
									<Button
										type="submit"
										variant="outline"
										size="sm"
										className={styles.logoutButton}
									>
										Logout
									</Button>
								</form>
							</div>
						) : (
							<div className={styles.notSignedIn}>
								Not signed in
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
