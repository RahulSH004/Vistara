//connection pool
import 'dotenv/config';
import express from 'express';
import authRouter from './modules/auth/auth_router.js';
import hotelRouter from './modules/hotel/hotel_routes.js';
import { errorHandler } from './middleware/error_middleware.js';
import roomrouter from './modules/rooms/rooms_routes.js';
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api", roomrouter);
app.use(errorHandler);
app.listen(PORT ,() => {

    console.log(`server is running on port ${PORT}`);
})



