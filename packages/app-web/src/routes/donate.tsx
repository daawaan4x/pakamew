import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeartIcon } from "lucide-react";

export const Route = createFileRoute("/donate")({
	component: DonatePage,
});

function DonatePage() {
	return (
		<main className="mx-auto flex h-full w-full max-w-3xl px-4 py-10 sm:px-6">
			{/* Accessible page heading for screen readers */}
			<h1 className="sr-only">Donate</h1>
			{/* Placeholder state until donation flow is implemented */}
			<Empty className="border-border bg-card">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<HandHeartIcon />
					</EmptyMedia>
					<EmptyTitle>Donations Coming Soon</EmptyTitle>
					<EmptyDescription>
						We are preparing the donation flow. You can continue monitoring the shelter livestream from the homepage.
					</EmptyDescription>
				</EmptyHeader>
				{/* Quick navigation actions */}
				<EmptyContent className="sm:flex-row sm:justify-center">
					<Button asChild>
						<Link to="/">Back to Homepage</Link>
					</Button>
					<Button asChild variant="outline">
						<Link to="/livestream">Open Live Stream</Link>
					</Button>
				</EmptyContent>
			</Empty>
		</main>
	);
}
