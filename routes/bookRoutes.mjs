import express from "express";
import bookController from "../controller/bookController.mjs";
const router = express.Router();

router
  .route("/booklist")
  .get((req, res) => bookController.getAllBook(req, res))
  .post((req, res) => bookController.addBook(req, res));

router
  .route("/booklist/:bookId")
  .get((req, res) => bookController.getById(req, res))
  .put((req, res) => bookController.updateBook(req, res))
  .delete((req, res) => bookController.deleteBook(req, res));
export default router;
