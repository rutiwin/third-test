import runQuery from "../db/dal";

export async function isDbServerUp() {    
    try {
        await runQuery("SELECT id FROM server WHERE id=0;");
        return true;
    } catch (error) {
        return false;
    }
}