import { describe, expect, it, vi } from "vitest";
import { BookListRepository } from "./BookList.repository";
import { ApiService } from "../../common/ApiService";
import { userStore } from "../../stores/UserStore";
import { BookListController } from "./BookList.ctrl";
import { BookListModel } from "./BookList.model";

describe("loadAllBooks", () => {
  it("retrieves all books from the repository a single time", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const controller = new BookListController(
      repository,
      new BookListModel(),
      userStore
    );
    const getAllSpy = vi.spyOn(repository, "getAllBooks");

    await controller.loadAllBooks();

    expect(getAllSpy).toHaveBeenCalledOnce();
  });

  it("should store the loaded books in the model", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const model = new BookListModel();
    const controller = new BookListController(repository, model, userStore);
    vi.spyOn(repository, "getAllBooks").mockResolvedValue([
      {
        id: 1,
        author: "Daniel Schimmel",
        name: "Keith",
        ownerId: "addo",
      },
    ]);

    await controller.loadAllBooks();

    expect(model.books).toStrictEqual([
      {
        id: 1,
        author: "Daniel Schimmel",
        name: "Keith",
        ownerId: "addo",
      },
    ]);
  });

  it("should clear the book list if unable to load from the backend", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const model = new BookListModel();
    const controller = new BookListController(repository, model, userStore);
    vi.spyOn(repository, "getAllBooks").mockImplementation(async () => {
      throw new Error("Some error");
    });

    await controller.loadAllBooks();

    expect(model.books).toHaveLength(0);
  });
});

describe("addBook", () => {
  it("should refresh the book list after a new book is added", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const model = new BookListModel();
    const controller = new BookListController(repository, model, userStore);
    vi.spyOn(apiService, "post").mockResolvedValue({});
    const loadAllSpy = vi.spyOn(controller, "loadAllBooks");

    await controller.addBook({
      author: "Roland Reilly",
      name: "Avarus Comburo",
    });

    expect(loadAllSpy).toHaveBeenCalledOnce();
  });

  it("should not reload books if adding a book fails", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const model = new BookListModel();
    const controller = new BookListController(repository, model, userStore);
    vi.spyOn(apiService, "post").mockImplementation(() => {
      throw new Error("Some error");
    });
    const loadAllSpy = vi.spyOn(controller, "loadAllBooks");

    await controller.addBook({
      author: "Tony Kuphal",
      name: "Ipasm",
    });

    expect(loadAllSpy).toHaveBeenCalledTimes(0);
  });
});

describe("addRandomBook", () => {
  it("should invoke addBook once", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const model = new BookListModel();
    const controller = new BookListController(repository, model, userStore);
    vi.spyOn(apiService, "post").mockResolvedValue({});
    const addBookSpy = vi.spyOn(controller, "addBook");

    await controller.addRandomBook();

    expect(addBookSpy).toHaveBeenCalledOnce();
  });
});
