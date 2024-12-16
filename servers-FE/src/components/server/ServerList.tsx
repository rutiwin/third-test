import React from 'react';
import './Server.css';
import { serverModel } from '../../models/ServerModel';
import ServerCard from './ServerCard';

type ServerListProps = {
    servers: Array<serverModel>;
    onToggleStatus: (id: number, newStatus: boolean) => void;
};

const ServerList = ({ servers, onToggleStatus }: ServerListProps) => {
    return (
        <div className="server-container">
            {servers.map((s) => (
                <ServerCard
                    key={s.id}
                    serverData={s}
                    onToggleStatus={onToggleStatus}
                />
            ))}
        </div>
    );
};

export default ServerList;
