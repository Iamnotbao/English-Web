import { Request, Response } from "express";
import authService from "../services/auth.service";

export const SignIn = async (req: Request, res: Response) => {
    try {
        const user = await authService.SignIn(req.body);
        res.status(200).json({
            message: 'User logged in successfully',
            username: user.username,
            email: user.email,
            // token: user.token
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const SignUp = async (req: Request, res: Response) => {
    try {
        await authService.SignUp(req.body);
        res.status(201).json({
            message: 'User signed up successfully',
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
