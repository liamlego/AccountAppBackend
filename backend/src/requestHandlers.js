import { addApp, areCredentialsValid, getUserData, insertNewUser, updatePassword } from "./databaseHandler.js";

export function runLogin(app) {
    app.post('/endpoint/login', (req, res) => {

        let body = req.body;
        let validation = false;

        console.log("LOGIN REQUEST FROM: " + body.username);
        // putting it in an async will pass it over to the browser to process
        // since we have an await keyword within the function
        (async () => {
            let value = await areCredentialsValid(body.username, body.password);

            if (value) {
                validation = true;
            } 
            res.send({
                response: validation
            });
        })();
    });  
}

export function runProfile(app) {
    app.post('/endpoint/profile', (req, res) => {
        const body = req.body;

        (async () => {

            let data = await getUserData(body.username);

            res.send({
                profileLink: 'http://localhost:3001/images/blank-profile.jpg',
                description: data.description
            });
        })();


    });
}

export function runApps(app) {
    app.post('/endpoint/apps', (req, res) => {

        const body = req.body;

        (async () => {

            const data = await getUserData(body.username);

            const list = data.apps.split(' ');

            res.send({
                apps: list
            });

        })();

    });
}

export function runAddAccount(app) {
    app.post('/endpoint/newAccount', (req) => {
        const username = req.body.username;
        const password = req.body.password;
        const description = req.body.description;

        insertNewUser(username, password, description, '');
    });
}

export function runAddApp(app) {
    app.post('/endpoint/addApp', (req) => {
        const username = req.body.username;
        const ap = req.body.app;
        addApp(username, ap);
    })
}

export function runAddPasswordChange(app) {
    app.post('/endpoint/newPassword', (req) => {
        updatePassword(req.body.username, req.body.password);
    });
}