import express from 'express';
import routes from './routes';
import { connect } from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
console.log('Mongo URL: ', dbUrl);

app.use(routes);

connect(dbUrl as string).then(res => {
    console.log('Ya se conectó');
    app.listen(port, () => {
        console.log(`App is running in port `)
    });
}).catch(err => {
    console.log("Error");
});