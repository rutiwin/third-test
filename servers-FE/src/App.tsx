import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import { changeServerStatus, getServers } from "./client/serversApi"; // Import API functions
import ServerList from "./components/server/ServerList";
import { serverModel } from "./models/ServerModel";

function App() {
    const [servers, setServers] = useState<serverModel[]>([]);
    const [isCreatedChecked, setIsCreatedChecked] = useState<boolean>(false);
    const [isActiveChecked, setIsActiveChecked] = useState<boolean>(false);

    useEffect(() => {
        fetchAllServers();
    }, []);

    const handleSearch = (serverCreationTime?: boolean, isOnline?: boolean) => {
        setIsCreatedChecked(serverCreationTime || false);
        setIsActiveChecked(isOnline || false);
    
        fetchAllServers(serverCreationTime, isOnline);
    };    
    
    const fetchAllServers = async (serverCreationTime?: boolean, isOnline?: boolean) => {
        try {
            const serversData = await getServers(serverCreationTime, isOnline);    
            if (serversData) {
                setServers(serversData);
            } else {
                setServers([]);
                alert("No servers found for your search.");
            }
        } catch (error) {
            console.error("Error fetching servers:", error);
            alert("Error fetching servers. Please try again later.");
        }
    };
    
    const handleToggleStatus = async (id: number, newStatus: boolean) => {
        const serverToUpdate = servers.find(s => s.id === id);
        if (!serverToUpdate) {
            return
        };
        const previousStatus = serverToUpdate.status;

        setServers(prev =>
            prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
        );

        try {
            await changeServerStatus(id, newStatus);

        } catch (error) {
            setServers(prev =>
                prev.map(s => s.id === id ? { ...s, status: previousStatus } : s)
            );
            console.error("Error updating server status:", error);
            alert("Error updating server status. Please try again later.");
        }
    };

    return (
        <div>
            <Header
                handleSearch={handleSearch}
                servers={servers}
            />
            <ServerList
                servers={servers}
                onToggleStatus={handleToggleStatus}
            />
        </div>
    );
}

export default App;
