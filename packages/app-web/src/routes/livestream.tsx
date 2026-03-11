import { LivestreamPlayer } from "@/components/livestream-player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshakeIcon, HouseIcon } from "lucide-react";

export const Route = createFileRoute("/livestream")({
	component: LivestreamPage,
});

// Local websocket endpoint used by the livestream viewer component.
const LIVESTREAM_URL = "ws://127.0.0.1:3000/viewer";

function LivestreamPage() {
	return (
		<main className="mx-auto flex h-full w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
			{/* Page heading and live status */}
			<header className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-1">
					<p className="text-muted-foreground text-sm">Shelter Monitoring</p>
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Live Feed</h1>
				</div>

				<Badge variant="destructive">Live</Badge>
			</header>

			{/* Livestream display card */}
			<Card className="gap-0 overflow-hidden py-0">
				<CardHeader className="border-b">
					<CardTitle>Camera Stream</CardTitle>
					<CardDescription>Monitor the shelter in real time.</CardDescription>
				</CardHeader>

				{/* Stream frame viewport */}
				<CardContent className="p-0">
					<AspectRatio ratio={16 / 9} className="bg-muted">
						<LivestreamPlayer
							url={LIVESTREAM_URL}
							alt="Livestream from shelter camera"
							className="h-full w-full object-cover"
						/>
					</AspectRatio>
				</CardContent>
			</Card>

			{/* Route actions */}
			<div className="flex flex-wrap items-center gap-3">
				<Button asChild>
					<Link to="/">
						<HouseIcon data-icon="inline-start" />
						Back to Home
					</Link>
				</Button>
				<Button asChild variant="outline">
					<Link to="/donate">
						<HeartHandshakeIcon data-icon="inline-start" />
						Donate
					</Link>
				</Button>
			</div>
		</main>
	);
}
