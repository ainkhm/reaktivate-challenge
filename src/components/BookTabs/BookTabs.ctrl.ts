import { makeAutoObservable } from "mobx";
import { BookListController, bookListCtrl } from "../BookList/BookList.ctrl";
import { bookTabsModel, BookTabsModel, Tabs } from "./BookTabs.model";

export class BookTabController {
  constructor(
    private model: BookTabsModel,
    private booksCtrl: BookListController
  ) {
    makeAutoObservable(this);
  }

  async setTab(newTab: Tabs): Promise<void> {
    this.model.tab = newTab;

    switch (this.model.tab) {
      case Tabs.All: {
        await this.booksCtrl.loadAllBooks();
        break;
      }
      case Tabs.Private: {
        await this.booksCtrl.loadPrivateBooks();
        break;
      }
      default: {
        throw new Error("Unexpected tab");
      }
    }
  }
}

export const bookTabsCtrl = new BookTabController(bookTabsModel, bookListCtrl);
