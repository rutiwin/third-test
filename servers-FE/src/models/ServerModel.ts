export class serverModel {
    id: number;
    serverName: string;
    ip: string;
    status: boolean;
    createdAt: Date;
    companyName: string;

    constructor(id: number, serverName: string, ip: string, status: boolean, createdAt: Date, companyName: string){
        this.id = id;
        this.serverName = serverName;
        this.ip = ip;
        this.status = status;
        this.createdAt = createdAt;
        this.companyName = companyName;
    }
}