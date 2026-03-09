import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			Hello World
			<a href="/_demo/livestream">
				{" "}
				<button type="button"> Go to Livestream</button>{" "}
			</a>
		</div>
	);
}
