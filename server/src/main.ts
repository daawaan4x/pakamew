import { createServer } from "node:http";
import { handleNodeRequest } from "./app";
import { getEnv } from "./env";

const env = getEnv((env) => ({ HOST: env.HOST, PORT: env.PORT }));

const server = createServer((req, res) => void handleNodeRequest(req, res));

server.listen(env.PORT, env.HOST, () => console.log(`Listening on ${env.HOST}:${env.PORT}`));
