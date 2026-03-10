/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

interface Livestream {
	frameUrl: string | null;
	status: "idle" | "connecting" | "open" | "closed" | "error";
	error: Event | null;
	socket: WebSocket | null;
}

export interface LivestreamPlayerProps {
	url: string;
	alt?: string;
	className?: string;
}

function useLivestreamPlayer(url: string): Livestream {
	const [frameUrl, setFrameUrl] = useState<string | null>(null);
	const [status, setStatus] = useState<Livestream["status"]>("idle");
	const [error, setError] = useState<Event | null>(null);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const activeBlobUrlRef = useRef<string | null>(null);

	useEffect(() => {
		const ws = new WebSocket(url);
		ws.binaryType = "blob";
		setSocket(ws);

		setStatus("connecting");
		setError(null);
		setFrameUrl(null);

		ws.onopen = () => {
			setStatus("open");
		};

		ws.onmessage = (event) => {
			if (!(event.data instanceof Blob)) {
				return;
			}

			const nextBlobUrl = URL.createObjectURL(event.data);

			if (activeBlobUrlRef.current) {
				URL.revokeObjectURL(activeBlobUrlRef.current);
			}

			activeBlobUrlRef.current = nextBlobUrl;
			setFrameUrl(nextBlobUrl);
		};

		ws.onerror = (event) => {
			setStatus("error");
			setError(event);
		};

		ws.onclose = () => {
			setStatus("closed");
		};

		return () => {
			ws.onopen = null;
			ws.onmessage = null;
			ws.onerror = null;
			ws.onclose = null;

			if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
				ws.close();
			}

			if (activeBlobUrlRef.current) {
				URL.revokeObjectURL(activeBlobUrlRef.current);
				activeBlobUrlRef.current = null;
			}

			setSocket((currentSocket) => (currentSocket === ws ? null : currentSocket));
		};
	}, [url]);

	return {
		frameUrl,
		status,
		error,
		socket,
	};
}

export function LivestreamPlayer({ url, alt = "Connecting...", className }: LivestreamPlayerProps) {
	const { frameUrl } = useLivestreamPlayer(url);

	return <img src={frameUrl ?? ""} alt={alt} className={className} />;
}
