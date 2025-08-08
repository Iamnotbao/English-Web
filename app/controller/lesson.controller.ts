import { Request, Response } from "express"
import LessonService from "../services/lesson.service";
import { readSync } from "fs";


export const getAllLesson = async(req: Request, res : Response)=>{
    try {
        const allLessons = await LessonService.GetAllLesson();
        if(allLessons){
            res.status(200).json({
                message:"Get all lessons successfully",
                success:true,
                lessons:allLessons
            })
        }
    } catch (error : any) {
        console.log(error);
    }
}
// export const getSingleLesson =(req: Request, res : Response)=>{
    
// }
export const createLesson = async(req: Request, res : Response)=>{
        const user_id = req.params.user_id; 
        const lessons = req.body;
        try {
            const newLessonList = await LessonService.CreateLesson(user_id,lessons);
            if(newLessonList){
                return res.status(200).json({
                    message:"successfully added the lesson",
                    data: newLessonList
                })
            }
        } catch (error:any) {
            console.log(error);
            
        }
}
// export const editLesson =(req: Request, res : Response)=>{
    
// }
// export const deleteLesson =(req: Request, res : Response)=>{
    
// }
