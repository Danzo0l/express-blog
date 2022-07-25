import jwt from "jsonwebtoken";
import secret_key from "../index.js";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, secret_key);
            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Not acces',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Not acces',
        });
    }

};