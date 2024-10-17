import express from 'express';
import { config } from 'dotenv';
config();
import routes from './routes';
import { connect } from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
console.log('Mongo URL: ', dbUrl);

app.use(express.json());
app.use(routes);

connect(dbUrl as string).then(res => {
    console.log('Ya se conectó la base');
    app.listen(port, () => {
        console.log(`App is running in port ${port}`)
    });
}).catch(err => {
    console.log("Error");
});