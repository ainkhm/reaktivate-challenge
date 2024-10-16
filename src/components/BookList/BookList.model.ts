import { makeAutoObservable } from "mobx";
import { Book } from "./BookList.type";

export class BookListModel {
  books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const bookListModel = new BookListModel();
