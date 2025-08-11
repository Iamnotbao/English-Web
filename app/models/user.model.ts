import mongoose, { Document, Query, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser.interface';
import { EnglishLevel } from '../interfaces/IUser.interface'; 

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String },
    phone: { type: String },
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    certifications: [{ type: String }],
    badges: [{ type: String }],
    gallery: [{ type: String }],
    level: {
      type: String,
      enum: Object.values(EnglishLevel),
      default: EnglishLevel.A1
    },
    overall: { type: Number, min: 0, max: 100, default: 0 },
    skills: [
      {
        name: { type: String, required: true },
        progress: { type: Number, min: 0, max: 100, default: 0 },
      },
    ],
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this as IUserDocument;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.pre<Query<IUser[], IUser>>(/^find/, function (next) {
  this.populate({
    path: 'lessons',
    model: 'Lesson',
  });
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;
  return bcrypt.compare(candidatePassword, user.password);
};
export default mongoose.model<IUserDocument>('User', UserSchema);
