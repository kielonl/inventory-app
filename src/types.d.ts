export interface Item {
  type: string;
  name: string;
  uuid?: string;
}

export interface UpdateItem extends Omit<Item, "uuid"> {
  message?: string;
}

export interface ItemError {
  errorMessage: string;
}
