import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";


const port = 8000;
const secret_key = "jk4h35kj34324654^$%&hrftejytk6%*&jn";
const db_password = "root"
const db_url = `mongodb+srv://danzo0l:${db_password}@mern-blog.gbzas.mongodb.net/blog?retryWrites=true&w=majority`;

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


app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on http://127.0.0.1:${port}`);
});

export default secret_key;