import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('fullName').isLength({min: 3}),
    body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
];

export const postCreateValiadtion = [
    body('title').isLength({min: 5}).isString(),
    body('text').isLength({min: 20}).isString(),
    body('tags').optional().isString(),
    body('imageURL').optional().isString(),
];