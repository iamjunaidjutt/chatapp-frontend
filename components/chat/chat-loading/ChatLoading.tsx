"use client";

import styles from "./ChatLoading.module.scss";

export default function ChatLoading() {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingContent}>
				<div className={styles.spinner}>
					<div className={styles.spinnerCircle}></div>
					<div className={styles.spinnerCircle}></div>
					<div className={styles.spinnerCircle}></div>
				</div>
				<h3 className={styles.loadingTitle}>Loading Chat...</h3>
				<p className={styles.loadingText}>
					Setting up your chat experience
				</p>
			</div>
		</div>
	);
}
