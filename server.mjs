import express from "express";
import bookRoutes from "./routes/bookRoutes.mjs";

const app = express();
app.use(express.json());
const PORT = 4000;

app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`App running successful on ${PORT}`);
});
