/**
 * server.js - The Cloud Relay Server
 */
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the HTML frontend
app.use(express.static(path.join(__dirname, "public")));

// Keep track of connected viewers
let viewers = new Set();

wss.on("connection", (ws, req) => {
	// Determine connection type based on URL path
	const url = req.url;

	if (url === "/esp32-stream") {
		console.log("📷 ESP32 Camera Connected!");

		ws.on("message", (data) => {
			// When a JPEG frame is received from ESP32, broadcast it to all viewers
			for (let viewer of viewers) {
				if (viewer.readyState === WebSocket.OPEN) {
					viewer.send(data);
				}
			}
		});

		ws.on("close", () => console.log("📷 ESP32 Camera Disconnected."));
	} else if (url === "/viewer") {
		console.log("👁️ New Viewer Connected!");
		viewers.add(ws);

		ws.on("close", () => {
			console.log("👁️ Viewer Disconnected.");
			viewers.delete(ws);
		});
	} else {
		ws.close(); // Reject unknown connections
	}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`🚀 Global Stream Relay Server running on port ${PORT}`);
});
