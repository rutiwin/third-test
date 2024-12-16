import express, { Request, Response, NextFunction, query } from "express";
import { appConfig } from "../utils/appConfig";
import { StatusCode } from "../models/statusEnum";
import { changeServerStatus, getServers } from "../services/serversService";
import { ValidationError } from "../models/exceptions";

export const serversRouter = express.Router();

serversRouter.get(appConfig.routePrefix + "/servers", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { serverCreationTime , isOnline } = req.query;
                
        const servers = await getServers(Boolean(serverCreationTime), Boolean(isOnline));
        res.status(StatusCode.Ok).json(servers);
    } catch (error) {
        next(error);
    }
})

serversRouter.post(appConfig.routePrefix + "/server/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, newStatus } = req.body;

        // Simple validation
        if (typeof id !== 'number' || typeof newStatus !== 'boolean') {
            throw new ValidationError("Invalid input: 'id' must be a number and 'newStatus' must be a boolean.");
        }

        await changeServerStatus(id, newStatus);
        res.status(StatusCode.Ok).json({ message: "Server status updated successfully." });
    } catch (error) {
        next(error);
    }
})