export interface Item {
  name: string;
  type: string;
  description: string;
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

export interface Login {
  username: string;
  password: string;
}

export interface InjectLogin {
  login: { value: { username: string; password: string } };
}

export interface ItemsStore {
  setItems(value: any[]): void;
  removeItem(itemIndex: number): never[];
  findItemIndex(id: string | undefined): number;
  validateItem(): boolean;
}

export interface LoginStore {
  login: {
      username: string;
      password: string;
  };
}, {}, {
  setLogin(value: {
      ...;
  }): void;
  validateLogin(): boolean;
}