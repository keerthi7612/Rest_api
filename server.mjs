import express, { Router } from "express";
import { book } from "./Data.mjs";

const app = express();
app.use(express.json());
const PORT = 4000;

//GET ALL DETAILS
app.get("/api/book", async function (req, res) {
  try {
    res.status(201).json({
      status: "successful",
      data: book,
    });
  } catch {
    res.status(400).json({ status: "unsuccessful" });
  }
});

//GET BY ID
app.get("/api/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const getBooks = book.find((books) => books.id === id);
  if (getBooks) {
    return res.send(getBooks);
  }
  return res.status(404).send({ msg: "book not found" });
});

//CREATE BOOK
app.post("/api/book", (req, res) => {
  const { body } = req;
  const newBook = { id: book[book.length - 1].id + 1, ...body };
  book.push(newBook);
  return res.status(201).send(newBook);
});

//DELETE A BOOK
app.delete("/api/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleteBooks = book.findIndex((books) => books.id === id);
  if (deleteBooks === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }
  book.splice(deleteBooks, 1);
  return res.status(200).json({
    message: "Book deleted successfully",
  });
});

//UPDATE THE DETAILS

app.put("/api/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  let bookIndex = book.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  book[bookIndex] = { id, ...updatedData };
  res.json({
    message: "User updated successfully",
    book: book[bookIndex],
  });
});

app.listen(PORT, () => {
  console.log(`App running successful on ${PORT}`);
});
