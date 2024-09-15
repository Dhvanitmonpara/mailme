import express from "express"
import cors from "cors"
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express()

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}

// cors middleware
app.use(cors(corsOptions))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.options('*', cors());  // Handle preflight requests for all routes

//routes import
import healthcheckRouter from "./routes/healthcheck.routes.js"
import mailRouter from "./routes/mail.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/mail", mailRouter)

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});