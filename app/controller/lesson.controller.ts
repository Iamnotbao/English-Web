import { Request, Response } from "express"
import LessonService from "../services/lesson.service";




export const getAllLesson = async (req: Request, res: Response) => {
    try {
        const allLessons = await LessonService.GetAllLesson();
        if (allLessons) {
            res.status(200).json({
                message: "Get all lessons successfully",
                success: true,
                lessons: allLessons
            })
        }
    } catch (error: any) {
        console.log(error);
    }
}
export const getSingleLesson = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const lesson = await LessonService.GetSingleLession(id);
        if (lesson) {
            return res.status(200).json({
                message: "Get lesson successfully!",
                lesson
            })
        }
        else {
            return res.status(404).json({
                message: "lesson is not found!"
            })
        }
    } catch (error: any) {
        console.log(error);
    }
}
export const createLesson = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const lessons = req.body;
    try {
        const newLessonList = await LessonService.CreateLesson(user_id, lessons);
        if (newLessonList) {
            return res.status(200).json({
                message: "successfully added the lesson",
                data: newLessonList
            })
        }
    } catch (error: any) {
        console.log(error);

    }
}
export const editLesson = async(req: Request, res : Response)=>{
    const id = req.params.id;
    const user_id= req.params.user_id;
    const lesson = req.body;
    try {
        const editLesson = await LessonService.EditLesson(id,user_id,lesson);
        if(editLesson){
            return res.status(200).json({
                message:"Edit successfully!",
                editLesson
            })
        }
    } catch (error) {
        console.error(error);
        
    }
}
export const deleteLesson =async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        try {
            await LessonService.DeleteLesson(id);
            return res.status(204).json({
                message:"delete successfully!"
            })
        } catch (error: any) {
            console.log(error);
        }
    }
    return res.status(402).json({
        message: "lesson_id is null"
    })
}
