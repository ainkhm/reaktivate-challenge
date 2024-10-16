import { makeAutoObservable, runInAction } from "mobx";
import { bookListModel, BookListModel } from "./BookList.model";
import { bookListRepository, BookListRepository } from "./BookList.repository";
import { AddBookDto, Book } from "./BookList.type";
import { faker } from "@faker-js/faker";
import { userStore, UserStore } from "../../stores/UserStore";

export class BookListController {
  constructor(
    private repository: BookListRepository,
    private model: BookListModel,
    private userStore: UserStore
  ) {
    makeAutoObservable(this);
  }

  async loadAllBooks(): Promise<void> {
    let books: Book[] = [];

    try {
      books = await this.repository.getAllBooks();
    } catch (e) {
      console.error(e);
    }

    runInAction(() => {
      this.model.books = books;
    });
  }

  async loadPrivateBooks(): Promise<void> {
    let books: Book[] = [];

    try {
      books = await this.repository.getPrivateBooks();
    } catch (e) {
      console.error(e);
    }

    runInAction(() => {
      this.model.books = books;
    });
  }

  async addBook(bookDto: AddBookDto): Promise<void> {
    const bookToAdd = {
      ...bookDto,
      id: Date.now(),
      ownerId: this.userStore.userId,
    } as Book;

    const isAdded = await this.repository.add(bookToAdd);

    if (isAdded) {
      await this.loadAllBooks();
    }
  }

  async addRandomBook(): Promise<void> {
    await this.addBook({
      name: faker.lorem.words({ min: 1, max: 10 }),
      author: faker.person.fullName(),
    });
  }
}

export const bookListCtrl = new BookListController(
  bookListRepository,
  bookListModel,
  userStore
);
