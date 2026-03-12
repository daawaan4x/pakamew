import { LiveBadge } from "@/components/live-badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";
import { ChatPanel } from "./-chat-panel";
import { EventsPanel } from "./-events-panel";

export const Route = createFileRoute("/livestream/")({
	component: LivestreamPage,
});

const LIVE_VIEWERS = "128";

function LivestreamPage() {
	return (
		<main className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden sm:px-6">
			<section className="shrink-0">
				<div className="relative overflow-hidden border-b sm:rounded-xl sm:border-x sm:border-b">
					<AspectRatio ratio={4 / 3} className="bg-muted relative">
						<img
							src="/mr-fresh.jpg"
							alt="Shelter livestream placeholder preview"
							className="h-full w-full object-cover"
						/>

						<div className="absolute top-3 left-3 z-10 flex items-center gap-2">
							<LiveBadge />
							<div className="bg-background/85 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
								<EyeIcon className="size-3.5" />
								<span>{LIVE_VIEWERS}</span>
							</div>
						</div>

						{/* TODO: Re-enable livestream player when feed availability is stable.
						<LivestreamPlayer
							url="ws://127.0.0.1:3000/viewer"
							alt="Livestream from shelter camera"
							className="h-full w-full object-cover"
						/>
						*/}
					</AspectRatio>
				</div>
			</section>

			<section className="min-h-0 flex-1 overflow-hidden sm:pt-5">
				<section className="hidden lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start lg:gap-6">
					<EventsPanel />
					<ChatPanel />
				</section>

				<section className="h-full min-h-0 lg:hidden">
					<Tabs defaultValue="chat" className="h-full min-h-0 gap-0">
						<TabsList
							variant="line"
							className="w-full shrink-0 rounded-none border-b pt-1 group-data-horizontal/tabs:h-11">
							<TabsTrigger value="chat" className="h-8">
								Live Chat
							</TabsTrigger>
							<TabsTrigger value="events" className="h-8">
								Events
							</TabsTrigger>
						</TabsList>

						<TabsContent value="chat" className="min-h-0 flex-1 overflow-hidden">
							<ChatPanel />
						</TabsContent>
						<TabsContent value="events" className="min-h-0 flex-1 overflow-y-auto">
							<EventsPanel />
						</TabsContent>
					</Tabs>
				</section>
			</section>
		</main>
	);
}
