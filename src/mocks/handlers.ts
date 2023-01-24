import { rest } from "msw";

export default [
  rest.post("/login", async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json({
        success: true,
        login: body.username,
        password: body.password,
        token: "test token",
      })
    );
  }),

  rest.get("/items/", (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            name: "test name",
            description: "test description",
            type: "test type",
            uuid: "test uuid",
            created_at: "test created_at",
            updated_at: "test updated",
          },
        ],
      })
    );
  }),
];
