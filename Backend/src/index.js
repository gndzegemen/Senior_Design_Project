import  express  from "express";
import { userRouter } from "./routes/authpage.js";
import { itemRouter } from "./routes/itemRoutes.js";
import { userInfoRouter } from "./routes/userRoutes.js";
import  dotenv  from "dotenv";
import { connectDb } from "./config/dbConfig.js";
import { corsMiddleware } from "./config/corsConfig.js";
import {openAppRouter} from './routes/openAppRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

connectDb();

app.use(corsMiddleware);

app.use("/auth", userRouter);
app.use("/api", itemRouter);
app.use("/api", userInfoRouter);
app.use("/work", openAppRouter);

app.get("/", (req, res) => {
  res.send("main page test");
});

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server Listening on port ${port}...`));
