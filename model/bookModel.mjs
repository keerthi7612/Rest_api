import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});
const book = mongoose.model("book", bookSchema);
export default book;
