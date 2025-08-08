import { Request, Response } from "express";
import authService from "../services/auth.service";
import { access } from "fs";

export const SignIn = async (req: Request, res: Response) => {
    try {
        const user = await authService.SignIn(req.body);
        res.status(200).json({
            message: 'User logged in successfully',
            _id: user.user._id,
            username: user.user.username,
            email: user.user.email,
            access_token: user.access_token,
            refresh_token: user.refresh_token
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

export const SignOut = async (req: Request, res: Response) => {
    try {
        await authService.SignOut();
        res.status(201).json({
            message: 'User signed out successfully',
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const userFreshToken = async (req: Request, res: Response) => {
    try{

        const authHeader = req.headers['authorization'] as string | undefined;
        if(!authHeader){
            return res.status(401).json({
                message: "Authorization header is missing",
            });
        }
        const refresh_token = authHeader.split(" ")[1];
        if(refresh_token){
            const new_Access_Token = await authService.refreshTokenService(req, res);
           return res.status(200).json({
                message: "Token refreshed successfully",
                access_token: new_Access_Token
            });
        }
        else{
             return res.status(401).json({
                message: "the refresh token is not valid",
            });
        }
    }
    catch(error: any) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Failed to refresh token" });
    }

};