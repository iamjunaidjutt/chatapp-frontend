"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, systemTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// avoid hydration mismatch
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	// determine actual current theme
	const current = theme === "system" ? systemTheme : theme;

	return (
		<Button
			variant="outline"
			size="icon"
			aria-label="Toggle theme"
			onClick={() => setTheme(current === "dark" ? "light" : "dark")}
		>
			{current === "dark" ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
