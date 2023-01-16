export interface ItemStore {
  name: string;
  type: string;
  description: string;
  uuid?: string;
}

export interface Item extends ItemStore {
  create_date?: string;
  update_date?: string;
  enabled?: boolean;
}

export interface UpdateItem extends Omit<Item, "uuid"> {
  message?: string;
}

export interface ItemError {
  errorMessage: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface ServiceRead {
  items: Item[];
  total: number;
  page: number;
  size: number;
}
