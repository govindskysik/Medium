import { verify } from "hono/jwt";
import { Hono } from "hono";

export function initMiddleware(router: Hono) {
  router.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];

    try {
      //@ts-ignore
      const request = await verify(token, c.env.JWT_SECRET);
      if (request.id) {
        c.set("jwtPayload", request);
        await next();
      } else {
        c.status(403);
        return c.json({ error: "unauthorized" });
      }
    } catch (error) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  });
}
