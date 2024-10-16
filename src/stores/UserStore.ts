import { makeAutoObservable } from "mobx";

export class UserStore {
  userId = "andrey.khmelovsky";

  constructor() {
    makeAutoObservable(this);
  }
}

export const userStore = new UserStore();
