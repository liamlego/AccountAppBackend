import express from 'express'
import cors from 'cors'
import { runAddAccount, runAddApp, runAddPasswordChange, runApps, runLogin, runProfile } from './src/requestHandlers.js';


const app = express();

app.use(cors());

const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));

runLogin(app);
runProfile(app);
runApps(app);
runAddAccount(app);
runAddApp(app);
runAddPasswordChange(app);

app.listen(PORT, () => console.log("Server listening on port 3001"));
