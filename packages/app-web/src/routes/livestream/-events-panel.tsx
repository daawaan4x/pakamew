import { useLayoutEffect, useRef } from "react";
import { FEEDING_STATION_EVENTS } from "./-events-panel-seed";

export function EventsPanel() {
	const panelRef = useRef<HTMLElement>(null);

	useLayoutEffect(() => {
		const panel = panelRef.current;
		if (!panel) {
			return;
		}

		panel.scrollTop = 0;
		const tabsContent = panel.closest("[data-slot='tabs-content']");
		if (tabsContent instanceof HTMLElement) {
			tabsContent.scrollTop = 0;
		}
	}, []);

	return (
		<section ref={panelRef} className="overflow-hidden pb-10">
			<header className="border-b px-4 py-3">
				<p className="text-sm font-medium">Recent Feeding Station Events</p>
				<p className="text-muted-foreground mt-1 text-xs">
					Latest updates from dispensing, maintenance, and stream uptime.
				</p>
			</header>

			<ul className="divide-y">
				{FEEDING_STATION_EVENTS.map((event) => (
					<li key={event.id} className="px-4 py-3">
						<div className="mb-1 flex items-center justify-between gap-2">
							<p className="text-sm font-medium">{event.title}</p>
							<span className="text-muted-foreground text-xs">{event.time}</span>
						</div>
						<p className="text-muted-foreground text-sm">{event.description}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
