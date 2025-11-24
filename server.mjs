import express from "express";
import morgan from "morgan";

import bookRoutes from "./routes/bookRoutes.mjs";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/book", bookRoutes);

export default app;
