import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import errorHandler from "./middlewares/error.middleware.js"
const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))


import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import followRouter from "./routes/follow.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/follows", followRouter);
app.use("/api/v1/users", userRouter);


app.use(errorHandler)

export { app }
