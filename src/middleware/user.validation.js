import {body, validationResult, param} from "express-validator";
import User from "../model/user.model.js";

const validationRegister = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({min: 3})
        .withMessage("Username must be at least 5 characters long"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

const validationLogin = [
    body("email")
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

const validationUpdate = [
    param("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address"),

    body("username")
        .optional()
        .isString()
        .withMessage("Username must be a string")
        .isLength({min: 3})
        .withMessage("Username must be at least 5 characters long"),

    body("password")
        .optional()
        .isString()
        .withMessage("Password must be a string")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

const validationCredentials = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: "Unauthorized, invalid email"});
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res
                .status(401)
                .json({error: "Unauthorized, invalid credentials"});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error validation",
            message: error.message,
        });
    }
};

export {
    validationRegister,
    validationLogin,
    validationCredentials,
    validationUpdate,
};
