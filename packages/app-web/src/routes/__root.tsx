import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { cn } from "@/lib/utils";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
});

function RootComponent() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	// Demo routes manage their own layout and should not render global mobile navigation.
	const isDemo = pathname.startsWith("/_demo");

	return (
		<>
			{/* Scrollable viewport for the active route content */}
			<div className={cn("h-dvh overflow-y-auto", !isDemo ? "pb-16" : undefined)}>
				<Outlet />
			</div>

			{/* Persistent mobile bottom navigation for non-demo routes */}
			{!isDemo ? <MobileBottomNav pathname={pathname} /> : null}

			{/* Development tooling panels */}
			<TanStackDevtools
				config={{ position: "bottom-right" }}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}

function NotFoundComponent() {
	return <div>Not Found</div>;
}
