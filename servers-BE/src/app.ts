import express, { Request, Response } from "express"
import cors from "cors";
import { isDbServerUp } from "./utils/helpers";
import { appConfig } from "./utils/appConfig";
import catchAll from "./middlewares/catchAll";
import { serversRouter } from "./controllers/serversControllers";

const server = express();

server.use(cors());

// load body
server.use(express.json());

// Doorman security check
// server.use(doorman);

// register controllers
server.use("/", serversRouter);

// Error handling
server.use(catchAll);

// run server only if DB-server is active
isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})
