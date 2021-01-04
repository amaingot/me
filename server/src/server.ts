import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { appLogger, appErrorLogger, logger } from "./utils/logger";
import renderHtml from "./utils/renderHtml";

const PORT = 8080;

const app = express();

app.use(appLogger());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.use(appErrorLogger());

renderHtml(app);

app.get("/_health/ready", async (_req, res) => {
    return res.status(200).send("Ready");
});

app.get("/_health/alive", async (_req, res) => {
    return res.status(200).send("Alive");
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
