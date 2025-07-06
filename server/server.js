import express from "express";
const app = express();
import { config } from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRouter from "./routes/Route.js";
import MessageRoute from "./routes/MessageRoute.js";
import bodyParser from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const PORT = process.env.PORT;

/*+++++++++++++++++++++Middleware Routes+++++++++++++++++++++++*/
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // (optional) Parse URL-encoded data
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/message", MessageRoute);

/*+++++++++++++++++++++Routes+++++++++++++++++++++++*/

// Home Route
app.get("/", (req, res) => {
  res.send("This is main Page of backend");
});

/*+++++++++++++++++++++MongoDB Connection+++++++++++++++++++++++*/
dbConnection();

// App Lisining Methods
app.listen(PORT, () => {
  console.log(`App is running on port 3000`);
});
