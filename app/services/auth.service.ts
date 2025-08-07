import { IUser } from '../interfaces/IUser.interface';
import User from '../models/user.model';

const authService = {
    SignIn: async (userData : IUser) => {
        const user = await User.findOne({ 
            $or:[
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
        return user;
    },
    SignUp: async (userData : IUser) => {
        const user = new User(userData);
        console.log("Creating user with data:", userData);
        await user.save();
        return user;
    }
};

export default authService;

