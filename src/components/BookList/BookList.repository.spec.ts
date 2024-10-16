import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { BookListRepository } from "./BookList.repository";
import { ApiService } from "../../common/ApiService";
import { userStore } from "../../stores/UserStore";
import { Book } from "./BookList.type";

beforeAll(() => {
  global.fetch = vi.fn(() => {
    throw new Error("Network requests are not allowed during tests");
  });
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("getAllBooks", () => {
  it("makes a single fetch call with the correct URL", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const getSpy = vi.spyOn(apiService, "get").mockImplementation(() => {});

    await repository.getAllBooks();

    expect(getSpy).toHaveBeenCalledOnce();
    expect(getSpy).toHaveBeenCalledWith("books/andrey.khmelovsky");
  });
});

describe("addBook", () => {
  it("calls fetch once with the correct URL and the correct request body", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    const postSpy = vi.spyOn(apiService, "post").mockImplementation(() => {});

    await repository.add({
      author: "Daniel Schimmel",
      name: "Keith",
    });

    expect(postSpy).toHaveBeenCalledOnce();
    expect(postSpy).toHaveBeenCalledWith("books/andrey.khmelovsky", {
      author: "Daniel Schimmel",
      name: "Keith",
    });
  });

  it("returns true when a book is successfully added", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    vi.spyOn(apiService, "post").mockResolvedValue({
      id: 1,
      author: "Daniel Schimmel",
      name: "Keith",
      ownerId: "andrey.khmelovsky",
    } as Book);

    const result = await repository.add({
      author: "Daniel Schimmel",
      name: "Keith",
    });

    expect(result).toBeTruthy();
  });

  it("returns false if adding a book fails", async () => {
    const apiService = new ApiService();
    const repository = new BookListRepository(apiService, userStore);
    vi.spyOn(apiService, "post").mockImplementation(() => {
      throw new Error("Some error");
    });

    const result = await repository.add({
      author: "Daniel Schimmel",
      name: "Keith",
    });

    expect(result).toBeFalsy();
  });
});
