import { describe, expect, it, vi } from "vitest";
import { BookTabController } from "./BookTabs.ctrl";
import { BookTabsModel, Tabs } from "./BookTabs.model";
import { BookListController, bookListCtrl } from "../BookList/BookList.ctrl";
import { bookListRepository } from "../BookList/BookList.repository";
import { bookListModel } from "../BookList/BookList.model";
import { userStore } from "../../stores/UserStore";

describe("setTab", () => {
  it("needs to update the tab in the model", async () => {
    const model = new BookTabsModel();
    const controller = new BookTabController(model, bookListCtrl);

    await controller.setTab(Tabs.Private);

    expect(model.tab).toBe(Tabs.Private);
  });

  it("loads all books when the tab switches to 'All'", async () => {
    const model = new BookTabsModel();
    const bookListCtrl = new BookListController(
      bookListRepository,
      bookListModel,
      userStore
    );
    const controller = new BookTabController(model, bookListCtrl);
    const loadAllSpy = vi
      .spyOn(bookListCtrl, "loadAllBooks")
      .mockImplementation(() => {});

    await controller.setTab(Tabs.All);

    expect(loadAllSpy).toHaveBeenCalledOnce();
  });

  it("displays private books when the tab is switched to Private", async () => {
    const model = new BookTabsModel();
    const bookListCtrl = new BookListController(
      bookListRepository,
      bookListModel,
      userStore
    );
    const controller = new BookTabController(model, bookListCtrl);
    const loadPrivateSpy = vi
      .spyOn(bookListCtrl, "loadPrivateBooks")
      .mockImplementation(() => {});

    await controller.setTab(Tabs.Private);

    expect(loadPrivateSpy).toHaveBeenCalledOnce();
  });
});
