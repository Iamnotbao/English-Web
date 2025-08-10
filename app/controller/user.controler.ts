import { Request, Response } from "express"
import { UserService } from "../services/user.service";

export const GetListByUser = async(req:Request, res: Response)=>{
    const user_id = req.params.user_id;
    const user_list =  await UserService.GetListByUser(user_id);
    if(user_list){
        return res.status(200).json({
            message:"Successfully get all list of user",
            user_list
        })
    }
}
export const GetProfileUser = async (req:Request, res: Response)=>{
    const user_id = req.params.user_id;
    const user = await UserService.GetProfileUSer(user_id);
    if(user){
        return res.status(200).json({
            message:"Successfully get profile of user",
            user
        })
    }
}

export const DeleteLessonByUser = async(req:Request, res: Response)=>{
    const user_id = req.params.user_id;
    const lesson_id = req.params.lesson_id;
    const result= await UserService.DeleteLessonByUser(user_id,lesson_id);
    if(result){
        return res.status(204).json({
            message:"Successfully delete lesson",
        })
    }
}