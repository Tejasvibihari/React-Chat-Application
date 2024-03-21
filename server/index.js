import express from 'express';
import mongoose from 'mongoose';
import userAuthRouter from './router/userAuth.route.js';




const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chattingDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", userAuthRouter)