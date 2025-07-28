"use client";

import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { createRoomAction } from "./rooms.action";

interface CreateRoomModalProps {
	children: React.ReactNode;
}

export default function CreateRoomModal({ children }: CreateRoomModalProps) {
	const session = useSession();
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		isPrivate: false,
		maxParticipants: 50,
	});

	if (!session) {
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await createRoomAction(formData);

			setFormData({
				name: "",
				description: "",
				isPrivate: false,
				maxParticipants: 50,
			});
			setOpen(false);
		} catch (error) {
			console.error("Failed to create room:", error);
			// You could add toast notification here
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (
		field: string,
		value: string | boolean | number
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Room</DialogTitle>
					<DialogDescription>
						Create a new chat room for discussions. Fill in the
						details below.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Room Name</Label>
						<Input
							id="name"
							placeholder="Enter room name"
							value={formData.name}
							onChange={(e) =>
								handleInputChange("name", e.target.value)
							}
							required
						/>
						<p className="text-sm text-muted-foreground">
							Choose a descriptive name for your room.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">
							Description (Optional)
						</Label>
						<Textarea
							id="description"
							placeholder="Enter room description"
							className="resize-none"
							value={formData.description}
							onChange={(e) =>
								handleInputChange("description", e.target.value)
							}
						/>
						<p className="text-sm text-muted-foreground">
							Provide a brief description of what this room is
							for.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="maxParticipants">
							Max Participants
						</Label>
						<Input
							id="maxParticipants"
							type="number"
							placeholder="50"
							min="2"
							max="1000"
							value={formData.maxParticipants}
							onChange={(e) =>
								handleInputChange(
									"maxParticipants",
									parseInt(e.target.value) || 50
								)
							}
						/>
						<p className="text-sm text-muted-foreground">
							Maximum number of people who can join this room.
						</p>
					</div>

					<div className="flex items-center justify-between rounded-lg border p-4">
						<div className="space-y-0.5">
							<Label htmlFor="isPrivate" className="text-base">
								Private Room
							</Label>
							<p className="text-sm text-muted-foreground">
								Private rooms require an invitation to join.
							</p>
						</div>
						<input
							id="isPrivate"
							type="checkbox"
							checked={formData.isPrivate}
							onChange={(e) =>
								handleInputChange("isPrivate", e.target.checked)
							}
							className="h-4 w-4"
						/>
					</div>

					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Creating..." : "Create Room"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
