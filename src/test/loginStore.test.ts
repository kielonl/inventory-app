import { setActivePinia, createPinia } from "pinia";
import { describe, expect, it } from "vitest";
import { useLoginStore } from "../stores/Login";

describe("loginStore", () => {
  setActivePinia(createPinia());

  it("should be able to login", () => {
    const store = useLoginStore();

    store.setLogin({ username: "test", password: "test" });

    expect(store.login).toEqual({ username: "test", password: "test" });
  });

  it("should be able to validate login", () => {
    const store = useLoginStore();

    store.setLogin({ username: "test", password: "test" });

    expect(store.validateLogin()).toBe(false);
  });
});
