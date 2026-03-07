//connection pool
import 'dotenv/config';
import express from 'express';
import authRouter from './modules/auth/auth_router.js';
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT ,() => {

    console.log(`server is running on port ${PORT}`);
})



