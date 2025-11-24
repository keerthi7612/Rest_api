import book from "../model/bookModel.mjs";

const getAllBook = async function (req, res) {
  try {
    const books = await book.find();
    res.status(200).json({
      status: "successfull",
      message: "the data are saved",
      data: books,
    });
  } catch {
    res
      .status(404)
      .json({ status: "unsuccessfull", message: "the data is not there" });
  }
};

const addBook = async function (req, res) {
  const { body } = req;

  if (!body.title || !body.author || body.price == null) {
    return res.status(400).json({
      error: "title, author, price are required",
    });
  }

  try {
    const lastBook = await book
      .findOne({ bookId: { $exists: true } })
      .sort({ bookId: -1 });
    const nextId = lastBook ? lastBook.bookId + 1 : 1;

    const addBook = await book.create({
      bookId: nextId,
      ...body,
    });
    await addBook.save();
    res.status(201).json(addBook);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error creating book", details: err.message });
  }
};

// get by ID
const getById = async function (req, res) {
  try {
    const id = Number(req.params.bookId);

    if (!id) return res.status(400).json({ error: "Invalid bookId" });

    const books = await book.findOne({ bookId: id });
    if (!books) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.bookId);

    if (!id) return res.status(400).json({ error: "Invalid bookId" });
    const updated = await book.findOneAndUpdate({ bookId: id }, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.bookId);
    if (!id) return res.status(400).json({ error: "Invalid bookId" });

    const bookDeleted = await book.findOneAndDelete({ bookId: id });

    if (!bookDeleted) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllBook,
  addBook,
  getById,
  updateBook,
  deleteBook,
};
