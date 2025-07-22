import { Hono } from "hono";
import { userRouter } from "./user";

export const blogRouter = new Hono();

userRouter.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

userRouter.post("/api/v1/blog", (c) => {
  return c.text("signin route");
});

userRouter.put("/api/v1/blog", (c) => {
  return c.text("signin route");
});
