import { createFileRoute } from "@tanstack/react-router";
import { LivestreamPlayer } from "../../components/livestream-player";

export const Route = createFileRoute("/_demo/livestream")({
	component: LivestreamPage,
});

const LIVESTREAM_URL = "ws://127.0.0.1:3000/viewer";

function LivestreamPage() {
	return (
		<div className="min-h-screen bg-[#111] p-5 text-center text-white" style={{ fontFamily: "sans-serif" }}>
			<h2 className="my-[0.83em] block text-[1.5em] font-bold">Live Security Feed</h2>
			<div className="mx-auto w-[90%] max-w-[640px] border-[5px] border-[#333] bg-black">
				<LivestreamPlayer url={LIVESTREAM_URL} className="block h-auto w-full" />
			</div>
			<button
				type="button"
				className="mt-5 cursor-pointer border-none bg-[#e74c3c] px-[30px] py-[15px] text-[1.2rem] text-white">
				FEED PET
			</button>
		</div>
	);
}
