"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const auth_route_1 = __importDefault(require("./routers/auth.route"));
const lesson_route_1 = __importDefault(require("./routers/lesson.route"));
const user_route_1 = __importDefault(require("./routers/user.route"));
const post_route_1 = __importDefault(require("./routers/post.route"));
const comment_route_1 = __importDefault(require("./routers/comment.route"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined in the .env file");
}
(0, db_1.default)();
app.use('/api/auth', auth_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/lesson', lesson_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
