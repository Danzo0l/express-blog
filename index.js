import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { registerValidation, loginValidation, postCreateValiadtion } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import * as UploadController from "./controllers/UploadController.js";


// Server variables
const port = 4444 //process.env.PORT || 8000;
const secret_key = "jk4h35kj34324654^$%&hrftejytk6%*&jn";
const db_password = "root"
const db_url = `mongodb+srv://danzo0l:${db_password}@cluster0.gbzas.mongodb.net/?retryWrites=true&w=majority`;
const uploads_path = 'uploads';


// Conntection server to MongoDB
mongoose.connect(db_url).then(() => {
    console.log('DB connected');
}).catch( (err) => {
    console.log('DB error: ', err);
});

// Initialize server const
const app = express();
// Write rules of server work
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// Initialize server folder for uploadss
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploads_path);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage })

// empty request
app.get('/', (req, res) => {
    res.send('Hello');
});


// ROUTING
// user auth routes
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// uploads routing
app.post('/upload', upload.single('image'), checkAuth, UploadController.loadFile);

// CRUD for post routing
app.get('/posts', PostController.getAll);
app.get('/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValiadtion, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove); 
app.patch('/posts/:id', checkAuth, postCreateValiadtion, PostController.update);


// Start server work
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on http://127.0.0.1:${port}`);
});

export default { secret_key, uploads_path };