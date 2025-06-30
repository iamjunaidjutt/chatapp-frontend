import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
	return (
		<>
			<ModeToggle />
			<div className="text-blue-600 dark:text-blue-500  text-6xl h-screen flex items-center justify-center">
				Hello World!
			</div>
		</>
	);
}
