import { ValidationError } from "./exceptions";
import Joi from "joi";

class serverModel {
    id: number;
    serverName: string;
    ip: string;
    status: boolean;
    createdAt?: Date;
    companyName: string;

    constructor(id: number, serverName: string, ip: string, status: boolean, createdAt: Date, companyName: string){
        this.id = id;
        this.serverName = serverName;
        this.ip = ip;
        this.status = status;
        this.createdAt = createdAt;
        this.companyName = companyName;
    }

    private static validateSchema = Joi.object({
        id: Joi.number().optional().positive(),
        serverName: Joi.string().required().min(1).max(50),
        ip: Joi.string().required().min(11).max(50),
        status: Joi.boolean().required(),
        createdAt: Joi.date().optional(),
        companyName: Joi.string().required().min(2).max(50)
    })

    validate(): void {               
        const res = serverModel.validateSchema.validate(this)
        if (res.error){                                                
            throw new ValidationError(res.error.details[0].message)            
        }
    }
}

export default serverModel;