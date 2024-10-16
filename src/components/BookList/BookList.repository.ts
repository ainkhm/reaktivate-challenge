import { makeAutoObservable } from "mobx";
import { ApiService, apiService } from "../../common/ApiService";
import { AddBookDto, Book } from "./BookList.type";
import { UserStore, userStore } from "../../stores/UserStore";

const ENTITY = "books";

export class BookListRepository {
  books: Book[] = [];

  constructor(private api: ApiService, private userStore: UserStore) {
    makeAutoObservable(this);
  }

  async getAllBooks(): Promise<Book[]> {
    return this.api.get(`${ENTITY}/${this.userStore.userId}`);
  }

  async getPrivateBooks(): Promise<Book[]> {
    return this.api.get(`${ENTITY}/${this.userStore.userId}/private`);
  }

  async add(bookDto: AddBookDto): Promise<boolean> {
    try {
      const addedBook = await this.api.post<AddBookDto, Book>(
        `${ENTITY}/${this.userStore.userId}`,
        bookDto
      );

      return Boolean(addedBook);
    } catch {
      return false;
    }
  }
}

export const bookListRepository = new BookListRepository(apiService, userStore);
