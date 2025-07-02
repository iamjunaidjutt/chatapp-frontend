import React from "react";

import styles from "./login.module.scss";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<div className={styles.login}>
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
