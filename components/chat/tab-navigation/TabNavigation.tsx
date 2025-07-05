"use client";

import styles from "./TabNavigation.module.scss";

interface TabNavigationProps {
	activeTab: "chats" | "settings";
	setActiveTab: (tab: "chats" | "settings") => void;
}

export default function TabNavigation({
	activeTab,
	setActiveTab,
}: TabNavigationProps) {
	return (
		<div className={styles.tabNavigation}>
			<button
				className={`${styles.tab} ${
					activeTab === "chats" ? styles.active : ""
				}`}
				onClick={() => setActiveTab("chats")}
			>
				<span className={styles.tabIcon}>💬</span>
				<span className={styles.tabLabel}>Chats</span>
			</button>
			<button
				className={`${styles.tab} ${
					activeTab === "settings" ? styles.active : ""
				}`}
				onClick={() => setActiveTab("settings")}
			>
				<span className={styles.tabIcon}>⚙️</span>
				<span className={styles.tabLabel}>Settings</span>
			</button>
		</div>
	);
}
