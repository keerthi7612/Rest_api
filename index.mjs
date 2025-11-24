import server from "./server.mjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "config.env" });
console.log(process.env.DB_user);
const PORT = process.env.PORT;

const connection = async () => {
  try {
    await mongoose.connect(process.env.mongoDb);
    console.log("server connect to the MongoDB");
  } catch (err) {
    console.log("server is not connect to MongoDB", err);
  }
};
connection();

server.listen(PORT, () => {
  console.log(`The server is connected to port,${PORT}`);
});
