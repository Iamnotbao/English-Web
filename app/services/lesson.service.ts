import { Types } from "mongoose";
import Lesson from "../models/lesson.model"
import User from "../models/user.model"
const LessonService = {
    GetAllLesson: async () => {
        try {
            const allLessons = await Lesson.find({});
            if (allLessons) {
                return allLessons
            }
        } catch (error: any) {
            console.log(error);
        }

    },
    CreateLesson : async(user_id : string, lessonData : Object)=>{
        try {
            const user = await User.findById(user_id);
            if(!user){
                throw new Error("User not found")
            }
           const lesson = new Lesson({
            ...lessonData,
            director: user,
           })
           await lesson.save();

           user.lessons.push(lesson._id as Types.ObjectId);
           await user.save();

           return lesson;
        } catch (error : any) {
            console.error(error);
        }
    }
}
export default LessonService;