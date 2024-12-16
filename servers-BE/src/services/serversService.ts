import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { NotFoundError } from "../models/exceptions";
import serverModel from "../models/serverModel";

export async function getServers(serverCreationTime?: boolean, isOnline?: boolean): Promise<serverModel[]> {
    let q = `SELECT s.id, s.serverName, s.ip, s.status, s.createdAt, h.companyName FROM server s JOIN hostingCompany h ON s.hostingCompanyId = h.id`;

    if (isOnline) {
        q += ` WHERE s.status=true`;
    }

    if (serverCreationTime) {
        q += ` ORDER BY s.createdAt DESC`;
    }
    
    const res = await runQuery(q);

    if (res.length === 0) {
        if (isOnline) {
            throw new NotFoundError(`No servers found with the status: ${isOnline}`);
        } else {
            throw new NotFoundError("No servers found.");
        }
    }

    const serversList = res.map((s) => new serverModel(s.id, s.serverName, s.ip, s.status, s.createdAt, s.companyName));
    return serversList;
}

export async function changeServerStatus(id: number, newStatus: boolean): Promise<void> {
    let q = `UPDATE server SET status=${newStatus} WHERE id=${id}`;

    const res = await runQuery(q) as ResultSetHeader | any;

    if (res.affectedRows === 0) {
        throw new NotFoundError(`No parking spaces found for ID: ${id}`);
    }
}