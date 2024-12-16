import runQuery from "./dal"

const createTables = async () => {
    let Q = `
    CREATE TABLE IF NOT EXISTS hostingCompany (
        id INT AUTO_INCREMENT PRIMARY KEY,
        companyName ENUM('Microsoft', 'IBM', 'GoDaddy', 'DigitalO') NOT NULL
        );
    `
    await runQuery(Q)

    Q = `
    CREATE TABLE IF NOT EXISTS server  (
        id INT AUTO_INCREMENT PRIMARY KEY,
        serverName VARCHAR(50) NOT NULL,
        ip VARCHAR(50) NOT NULL,
        hostingCompanyId INT NOT NULL,
        status BOOLEAN NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hostingCompanyId) REFERENCES hostingCompany(id)
    );
`
    await runQuery(Q);
}

const createSampleData = async () => {
    let Q = `
    INSERT INTO hostingCompany (companyName) VALUES 
        ('Microsoft'),
        ('IBM'),
        ('GoDaddy'),
        ('DigitalO');
    `
    await runQuery(Q);

    Q = `
        INSERT INTO server (serverName, ip, hostingCompanyId, status) VALUES 
        ('Server1', '192.168.1.1', 1, TRUE),
        ('Server2', '192.168.1.2', 2, FALSE),
        ('Server3', '192.168.1.3', 3, TRUE),
        ('Server4', '192.168.1.4', 4, FALSE),
        ('Server5', '192.168.1.5', 1, TRUE),
        ('Server6', '192.168.1.6', 2, FALSE),
        ('Server7', '192.168.1.7', 3, TRUE),
        ('Server8', '192.168.1.8', 4, FALSE),
        ('Server9', '192.168.1.9', 1, TRUE),
        ('Server10', '192.168.2.1', 2, FALSE),
        ('Server11', '192.168.2.2', 3, TRUE),
        ('Server12', '192.168.2.3', 4, FALSE);
    `
    await runQuery(Q);
}

// createTables().then(() => {
//     console.log("Done creating tables");
// })

// createSampleData().then(()=>{console.log("Done adding data");})
