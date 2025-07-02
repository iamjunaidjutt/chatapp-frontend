import React from "react";

import styles from "./register.module.scss";
import RegisterForm from "./RegisterForm";

const Register = () => {
	return (
		<div className={styles.register}>
			<h1 className={styles.chat}>
				Chat<span className={styles.app}>App</span>
			</h1>
			<div className={styles.formContainer}>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;
