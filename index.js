import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const port = 8000;
const secret_key = "jk4h35kj34324654^$%&hrftejytk6%*&jn";
const db_password = "root"
const db_url = `mongodb+srv://danzo0l:${db_password}@mern-blog.gbzas.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(db_url).then(() => {
    console.log('DB connected');
}).catch( (err) => {
    console.log('DB error: ', err);
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        name: "User", 
    }, secret_key);

    

    res.json({
        "status": 200,
        token
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on http://127.0.0.1:${port}`);
});