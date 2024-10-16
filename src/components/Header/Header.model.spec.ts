import { describe, expect, it } from "vitest";
import { HeaderModel } from "./Header.model";
import { BookListModel } from "../BookList/BookList.model";
import { faker } from "@faker-js/faker";
import { userStore } from "../../stores/UserStore";

describe("userBooks", () => {
  it("should calculate books from the BookListModel", async () => {
    const bookListModel = new BookListModel();
    bookListModel.books = [
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 10 }),
        author: faker.person.fullName(),
        ownerId: userStore.userId,
      },
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 10 }),
        author: faker.person.fullName(),
        ownerId: userStore.userId,
      },
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 10 }),
        author: faker.person.fullName(),
        ownerId: faker.string.alpha(10),
      },
    ];
    const model = new HeaderModel(bookListModel, userStore);

    expect(model.userBooks).toBe(2);
  });
});
