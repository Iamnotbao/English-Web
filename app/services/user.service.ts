import User from "../models/user.model"
export const UserService = {
    GetListByUser :async(user_id:string)=>{
        const user = await User.findById(user_id);
        if(!user){
            throw new Error("User is not exist!");
        }
        return user.lessons;
    },
    GetProfileUSer :async(user_id : string)=>{
        const user = await User.findById(user_id);
        if(!user){
            throw new Error("User is not exist!");
        }
        return user;
    }
}