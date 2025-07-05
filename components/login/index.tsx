import React from "react";

import styles from "./login.module.scss";
import LoginForm from "./LoginForm";
import { ModeToggle } from "@/components/theme/mode-toggle";

const Login = () => {
	return (
		<div className={styles.login}>
			<div className={styles.themeToggle}>
				<ModeToggle />
			</div>
			<h1 className={styles.chat}>
				Chat<span className={styles.app}>App</span>
			</h1>
			<div className={styles.formContainer}>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
