"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import styles from "./SettingsPanel.module.scss";

export default function SettingsPanel() {
	const { data: session } = useSession();
	const [settings, setSettings] = useState({
		notifications: true,
		soundEnabled: true,
		theme: "auto",
		fontSize: "medium",
		showOnlineStatus: true,
		autoJoinRooms: false,
	});

	const handleSettingChange = (key: string, value: boolean | string) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSaveSettings = () => {
		// TODO: Implement save settings to backend
		console.log("Settings saved:", settings);
	};

	return (
		<div className={styles.settingsPanel}>
			<div className={styles.settingsHeader}>
				<h3 className={styles.title}>Settings</h3>
				<button
					className={styles.saveButton}
					onClick={handleSaveSettings}
				>
					Save
				</button>
			</div>

			<div className={styles.settingsContent}>
				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Profile</h4>
					<div className={styles.profileInfo}>
						<div className={styles.avatar}>
							{session?.user?.image ? (
								<Image
									src={session.user.image}
									alt="Profile"
									className={styles.avatarImage}
									width={50}
									height={50}
								/>
							) : (
								<div className={styles.avatarPlaceholder}>
									{session?.user?.name?.charAt(0) || "U"}
								</div>
							)}
						</div>
						<div className={styles.userInfo}>
							<p className={styles.username}>
								{session?.user?.name || "Unknown User"}
							</p>
							<p className={styles.email}>
								{session?.user?.email || "No email"}
							</p>
						</div>
					</div>
				</div>

				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Notifications</h4>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<input
								type="checkbox"
								checked={settings.notifications}
								onChange={(e) =>
									handleSettingChange(
										"notifications",
										e.target.checked
									)
								}
								className={styles.checkbox}
							/>
							<span>Enable notifications</span>
						</label>
					</div>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<input
								type="checkbox"
								checked={settings.soundEnabled}
								onChange={(e) =>
									handleSettingChange(
										"soundEnabled",
										e.target.checked
									)
								}
								className={styles.checkbox}
							/>
							<span>Sound notifications</span>
						</label>
					</div>
				</div>

				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Appearance</h4>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<span>Theme</span>
							<select
								value={settings.theme}
								onChange={(e) =>
									handleSettingChange("theme", e.target.value)
								}
								className={styles.select}
							>
								<option value="auto">Auto</option>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
							</select>
						</label>
					</div>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<span>Font size</span>
							<select
								value={settings.fontSize}
								onChange={(e) =>
									handleSettingChange(
										"fontSize",
										e.target.value
									)
								}
								className={styles.select}
							>
								<option value="small">Small</option>
								<option value="medium">Medium</option>
								<option value="large">Large</option>
							</select>
						</label>
					</div>
				</div>

				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Chat</h4>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<input
								type="checkbox"
								checked={settings.showOnlineStatus}
								onChange={(e) =>
									handleSettingChange(
										"showOnlineStatus",
										e.target.checked
									)
								}
								className={styles.checkbox}
							/>
							<span>Show online status</span>
						</label>
					</div>
					<div className={styles.setting}>
						<label className={styles.settingLabel}>
							<input
								type="checkbox"
								checked={settings.autoJoinRooms}
								onChange={(e) =>
									handleSettingChange(
										"autoJoinRooms",
										e.target.checked
									)
								}
								className={styles.checkbox}
							/>
							<span>Auto-join public rooms</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
