import { createServer } from "node:http";
import { handleNodeRequest } from "./app";

const server = createServer((req, res) => void handleNodeRequest(req, res));

server.listen(3000, "127.0.0.1", () => console.log("Listening on 127.0.0.1:3000"));
