import {body, validationResult} from "express-validator";
import Message from "../model/message.model.js";

const validationLogin = [
    body("userId")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string"),
    (req, res, next) => {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

export {};
