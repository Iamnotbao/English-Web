import { IUser } from "../interfaces/IUser.interface";
import User from "../models/user.model"
export const UserService = {
    GetListByUser: async (user_id: string) => {
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        return user.lessons;
    },
    GetProfileUSer: async (user_id: string) => {
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        return user;
    },
    UpdateProfile: async (user_id: string, update_profile: Partial<IUser>) => {
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("User is not exist!");
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                user_id,
                { $set:update_profile },
                { new: true, runValidators: true }
            );
            return updatedUser;
        } catch (error) {
                throw new Error("Cannot update user!")
        }
    },
    DeleteLessonByUser: async (user_id: string, lesson_id: string) => {
        const user = await User.findById(user_id);
        if (!user) throw new Error("User does not exist!");
        // console.log(lesson_id);

        const oldCount = user.lessons.length;

        user.lessons = user.lessons.filter(
            (l) => l._id.toString() !== lesson_id
        );

        if (user.lessons.length === oldCount) {
            throw new Error("Lesson not found for this user!");
        }

        await user.save();

        return user;
    }

}