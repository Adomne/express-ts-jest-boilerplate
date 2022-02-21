import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import actuator from "express-actuator";

// Services
// import connectDB from "./db/db";

// Load config - Multiple Env Files
// if (process.env.NODE_ENV === "development") {
//     dotenv.config({ path: "./config/.env.development" });
// } else {
//     dotenv.config({ path: "./config/.env.production" });
// }

// Single Env File
dotenv.config({ path: "./config/.env" });

// Connect to DB
// connectDB();

// Express App
const app = express();

// Env Variable Port
const PORT = process.env.PORT || 3000;

// * Route Files
import first from "./routers/first";

// * Logging (Development)
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//  * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! Helmet
app.use(helmet());

// ! Cors
app.use(cors({ origin: true }));

// ! Health check
app.use(actuator());

// ! Routes
app.use("/first", first);


// ! Server Configuration
const httpServer = new http.Server(app);

const server = httpServer.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode with port ${PORT}`,
    ),
);

export = server;