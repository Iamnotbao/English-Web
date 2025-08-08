import { IUser } from '../interfaces/IUser.interface';
import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authService = {
    generateAccessToken: (data: Object) => {
        const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
        return access_token;
    },
    generateRefreshToken: (data: Object) => {
        const refresh_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '30d' });
        return refresh_token;
    },
    refreshTokenService: async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['authorization'] as string | undefined;
            if (!authHeader) {
                return res.status(401).json({
                    message: "Authorization header is missing",
                });
            }
            const refresh_token = authHeader.split(" ")[1];
            if (!refresh_token) {
                return res.status(401).json({
                    message: "Refresh token is not provided",
                });
            }
            const payload = await new Promise<JwtPayload & { _id: string; username: string }>((resolve, reject) => {
                jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded) => {
                    if (err) return reject(new Error("Invalid refresh token"));
                    resolve(decoded as JwtPayload & { _id: string; username: string });
                });
            });

            const newAccessToken = authService.generateAccessToken({
                id: payload._id,
                username: payload.username
            });

            return newAccessToken;

        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    },

    SignIn: async (userData: IUser) => {
        const user = await User.findOne({
            $or: [
                {
                    username: userData.username
                },
                {
                    email: userData.email
                }
            ]
        });
        if (!user) throw new Error('User not found');
        const isMatch = await user.comparePassword(userData.password);
        if (!isMatch) throw new Error('Password is not correct');
        const access_token = authService.generateAccessToken({ id: user._id, username: user.username });
        const refresh_token = authService.generateRefreshToken({ id: user._id, username: user.username });
        console.log("access_token:", access_token);
        console.log("refresh_token:", refresh_token);

        return { user, access_token, refresh_token };
    },
    SignUp: async (userData: IUser) => {
        const existingUser = await User.findOne({
            $or: [
                { username: userData.username },
                { email: userData.email }
            ]
        });
        if (existingUser) throw new Error('User already exists');
        const user = new User(userData);
        console.log("Creating user with data:", userData);
        await user.save();
        return user;
    },
    SignOut: async () => {
        return { message: 'User signed out successfully' };
    }
};

export default authService;

