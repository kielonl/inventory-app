export interface Item {
  type: string;
  name: string;
  description?: string;
  uuid?: string;
  create_at?: string;
  update_at?: string;
  enabled?: boolean;
}

export interface UpdateItem extends Omit<Item, "uuid"> {
  message?: string;
}

export interface ItemError {
  errorMessage: string;
}
