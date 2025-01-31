import User from "../model/user.model.js";
import {Request, Response} from "express";

export async function userRegister(req: Request, res: Response): Promise<any> {
    const {username, email, password} = req.body;
    try {
        console.log(req.body);
        const userExists = await User.findOne({userEmail: email});
        if (userExists) {
            return res.status(422).json({error: "User already exists"});
        }

        const user = new User({userName: username, userEmail: email, userPassword: password});
        await user.save();
        return res.status(201).json({message: "User registered successfully"});
    } catch (error: any) {
        return res
            .status(500)
            .json({error: "Internal server error", details: error.message});
    }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(500)
                .json({error: "Internal server error"});
        }

        if (!req.session) {
            return res.status(500).json({error: "Internal server error"});
        }

        req.session.userId = user._id as string;

        return res
            .status(200)
            .json({
                message: "User logged in successfully",
                username: user.userName,
            });
    } catch (error: any) {
        return res
            .status(500)
            .json({error: "Internal server error", message: error.message});
    }
}

export async function userUpdate(req: Request, res: Response): Promise<any> {
    const {username, password} = req.body;
    const {email} = req.params;

    try {
        const user: any = await User.findOne({email});

        if (username) user.username = username;
        if (password) user.password = password;

        await user.save();

        return res.status(200).json({message: "User update successfully"});
    } catch (error: any) {
        return res
            .status(500)
            .json({error: "Internal server error", message: error.message});
    }
}

export async function userDelete(req: Request, res: Response): Promise<any> {
    try {
        const {email} = req.params;
        await User.findOneAndDelete({email});
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error: any) {
        return res
            .status(500)
            .json({error: "Internal server error", message: error.message});
    }
}

