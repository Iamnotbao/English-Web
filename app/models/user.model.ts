import mongoose, { Document, Query, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser.interface';

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student',
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});


UserSchema.pre('save', async function (next) {
    const user = this as IUserDocument;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

UserSchema.pre<Query<IUser[], IUser>>(/^find/,function(next){
    this.populate({
        path:"lessons",
        model:"Lesson"
    });
    next();
})
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as IUserDocument;
    return bcrypt.compare(candidatePassword, user.password);
};

export default mongoose.model<IUserDocument>('User', UserSchema);
