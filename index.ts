import authRouter from './routes/auth';
import usersRouter from './routes/users';
import * as cookieParser from 'cookie-parser';
import { MONGO_URI, PORT } from './config';

import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

function connect(mongoUri = '') {
    console.log('Connecting to MongoDB ', mongoUri);
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('MONGODB is connected'))
        .catch(() => {
            console.log('MONGODB is not connected');
            process.exit(1);
        });
}
connect(MONGO_URI)

app.use(cookieParser())
app.use(authRouter);
app.use(usersRouter); // admin
app.listen(process.env.PORT || PORT, () => console.log('Authentication app is running!'))
