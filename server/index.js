import express from 'express';
import mongoose from 'mongoose';
import userAuthRouter from './router/userAuth.route.js';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import cors from 'cors';






const app = express();

const port = 3000;
app.use(express.json());
const server = new createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,

    }
});
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/chattingDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });



io.on('connection', (socket) => {
    console.log("User Connected");
    console.log(socket.id);
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.use("/api/auth", userAuthRouter)