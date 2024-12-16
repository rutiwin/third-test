import { appConfig } from "../appConfig";

export async function getServers(serverCreationTime?: boolean, isOnline?: boolean) {
    try {
        let url = `${appConfig.url}/servers`;
    
        if (serverCreationTime) {
            url += `?serverCreationTime=${serverCreationTime}`;
        }
    
        if (isOnline) {
            url += serverCreationTime ? `&isOnline=${isOnline}` : `?isOnline=${isOnline}`;
        }
            
        const res = await fetch(url);
        const resJ = await res.json();

        if (resJ.message?.includes("No servers found")) {
            return undefined;
        }
        
        return resJ;
    } catch (error) {
        console.log(error);
        alert("Some error occurred. Please try again later.");
    }
}

export async function changeServerStatus(id: number, newStatus: boolean): Promise<void> {
    try {
        const url = `${appConfig.url}/server/status`;
        
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, newStatus }),
        });
    
        if (!res.ok) {
            throw new Error(`Failed to update server status.`);
        }
    } catch (error) {
        console.log(error);
        alert("Some error occurred. Please try again later.");
    }
}
