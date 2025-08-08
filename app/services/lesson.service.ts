import { Types } from "mongoose";
import Lesson, { ILesson } from "../models/lesson.model"
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
    CreateLesson: async (user_id: string, lessonData: ILesson) => {
        try {
            const user = await User.findById(user_id);
            if (!user) {
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
        } catch (error: any) {
            console.error(error);
        }
    },
    GetSingleLession: async (id: string) => {
        try {
            const lesson = await Lesson.findById(id);
            if (!lesson) {
                throw new Error('Lesson does not exist!');
            }
            return lesson;
        } catch (error: any) {
            console.error(error)
        }
    },
    DeleteLesson: async (id: string) => {
        try {
            const lesson = await Lesson.findById(id);
            if (!lesson) {
                return lesson;
            }
            await User.updateMany({
                lessons: lesson._id
            },
                {
                    $pull: { lessons: lesson._id }
                }
            )
            // console.log("choose:", lesson);

            await Lesson.findByIdAndDelete(id);
            return lesson;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    },
    EditLesson: async (id: string, user_id: string, lesson: ILesson) => {
        try {
            const lessonById = await Lesson.findById(id);

            if (!lessonById) {
                return { message: "Lesson not found" };
            }
            console.log("check director",lessonById.director);
            
            if (user_id === lessonById.director.toString()) {
                const edit = await Lesson.findByIdAndUpdate(id, lesson, {new:true});
                console.log("after edit :", edit);
                return edit;
            }
            else {
                return {
                    message: "You are not the director, so you can not edit the lesson!"
                }
            }
        } catch (error: any) {
            console.error(error);

        }
    }

}
export default LessonService;