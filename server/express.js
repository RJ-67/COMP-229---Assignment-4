import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// RENDER DEPLOYMENT
app.use(cors({
  origin: [
    "http://localhost:5173",                
    "https://comp-229-assignment-4-frontend.onrender.com"    
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// REGISTER ALL ROUTES HERE
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", qualificationRoutes);
app.use("/", contactRoutes);

export default app;
