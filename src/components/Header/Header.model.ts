import { makeAutoObservable } from "mobx";
import { userStore, UserStore } from "../../stores/UserStore";
import { bookListModel, BookListModel } from "../BookList/BookList.model";

export class HeaderModel {
  constructor(
    public bookListModel: BookListModel,
    public userStore: UserStore
  ) {
    makeAutoObservable(this);
  }

  get userBooks(): number {
    return this.bookListModel.books.filter(
      (book) => book.ownerId === this.userStore.userId
    ).length;
  }
}

export const headerModel = new HeaderModel(bookListModel, userStore);
