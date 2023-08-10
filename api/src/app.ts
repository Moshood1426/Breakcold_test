import express, { Application, Request, Response } from 'express';
import userRoute from "./routes/userRoutes.js"

const app: Application = express();

const PORT: number = 3001;

app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.use('/user', userRoute);  // use entities router at path '/entities'

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
