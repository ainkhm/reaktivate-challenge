import { makeAutoObservable } from "mobx";

export enum Tabs {
  All = "All books",
  Private = "Private books",
}

export class BookTabsModel {
  tab = Tabs.All;

  constructor() {
    makeAutoObservable(this);
  }
}

export const bookTabsModel = new BookTabsModel();
