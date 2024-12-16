import React from 'react';
import './Server.css';
import { serverModel } from '../../models/ServerModel';

type ServerCardProps = {
    serverData: serverModel;
    onToggleStatus: (id: number, newStatus: boolean) => void;
};

const ServerCard = ({ serverData, onToggleStatus }: ServerCardProps) => {

    const handleToggle = () => {
        const newStatus = !serverData.status;
        onToggleStatus(serverData.id, newStatus);
    };

    return (
        <div className="card mb-3 server-card">
            <div className="card-body">
                <h4 className="serverName">{serverData.serverName}</h4>
                <h6 className="companyName">{serverData.companyName}</h6>
                <div className="ip">{serverData.ip}</div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheck${serverData.id}`}
                        checked={serverData.status}
                        onChange={handleToggle}
                    />
                    <span className="status"> {serverData.status ? "Online" : "Offline"} </span>
                </div>
            </div>
        </div>
    );
};

export default ServerCard;
