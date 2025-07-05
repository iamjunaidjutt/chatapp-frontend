"use client";

import { User } from "next-auth";
import styles from "./Home.module.scss";

interface HomeProps {
	user: User | null;
}

export default function Home({ user }: HomeProps) {
	return (
		<div className={styles.contentWrapper}>
			<div className={styles.welcomeCard}>
				<div className={styles.welcomeContent}>
					<h1 className={styles.title}>Welcome to ChatApp</h1>
					{user ? (
						<div className={styles.userInfo}>
							<p className={styles.greeting}>
								Hello, {user.name || user.email}!
							</p>
							<p className={styles.status}>
								You are successfully logged in.
							</p>
							<div className={styles.quickActions}>
								<p className={styles.hint}>
									Use the sidebar to navigate to your rooms or
									start chatting!
								</p>
							</div>
						</div>
					) : (
						<p className={styles.loginPrompt}>
							Please log in to continue.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
