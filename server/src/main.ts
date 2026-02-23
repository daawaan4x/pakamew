import { createServer } from "node:http";
import { handleNodeRequest } from "./app";
import { env } from "./env";

const server = createServer((req, res) => void handleNodeRequest(req, res));

server.listen(env.PORT, env.HOST, () => console.log(`Listening on ${env.HOST}:${env.PORT}`));
