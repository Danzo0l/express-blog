import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import secret_key from "../index.js";
import UserModel from "../models/User.js";


export const register = async (req, res) => {

    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, secret_key, {
            expiresIn: '7d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({
            ...userData,
            token,
        });


    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }   
};


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Login or password not valid',
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, secret_key, {
            expiresIn: '7d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({
            ...userData,
            token,
        })

    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
};


export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const {passwordHash, ...userData} = user._doc;

        res.status(200).json({
            ...userData,
        });

    } catch (err) {
        res.status(500).json({
            "error": err,
        });
    }
};