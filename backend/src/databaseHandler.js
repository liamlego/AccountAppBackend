
import e from 'express';
import pg from 'pg'


const pool = new pg.Pool({
    user: 'postgres',
    database: 'accountdb',
    password: 'password',
    port: 5432,
    host: 'localhost'
});


export function insertNewUser(username, password, description, apps) {
    console.log("Adding new User: " + username);
    pool.query("INSERT INTO accounts (username, password) VALUES ($1, $2)",
    [username, password]);
    pool.query("INSERT INTO userData (username, description, apps) VALUES ($1, $2, $3)",
    [username, description, apps]);
}

export async function areCredentialsValid(username, password) {
    return pool.query("SELECT * from accounts WHERE username=$1", [username]).then((res) => {
        if (res.rows.length > 0) {
            if (res.rows[0].password === password) return true;
        } 

        return false;

    });
}

export async function getUserData(username) {

    return pool.query("SELECT * from userData WHERE username=$1",
    [username]).then((res) => {
        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return {
                description: "YOU HAVE NO DESCRIPTION",
                apps: "YOU HAVE NO APPS"
            };
        }
    });
}

export async function addApp(username, app) {
    console.log("UPDATING APPS for " + username);

    pool.query("SELECT apps from userData WHERE username=$1", [username]).then(res => {
        const apps = res.rows[0].apps;
        
        for (let i = 0; i < apps.length; i++) {
            if (apps[i] !== ' ') {
                let isEqual = true;
                let aI = 0;
                while (i < apps.length && apps[i] !== ' ' && isEqual) {
                    
                    if (app[aI] !== apps[i]) {
                        isEqual = false;
                    }
                    aI++;
                    i++;
                }
                if (isEqual) return;
            }
        }
    
        pool.query("UPDATE userData SET apps=apps||' '||$1 WHERE username=$2", [app, username]);
    });
}

export async function updatePassword(username, password) {
    pool.query('UPDATE accounts SET password=$1 WHERE username=$2', [password, username]);
}