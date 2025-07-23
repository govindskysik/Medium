import { Hono } from "hono";

import { initMiddleware } from "../middleware";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

interface Bindings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export const blogRouter = new Hono<{
  Bindings: Bindings;
}>();

//@ts-ignore
initMiddleware(blogRouter);

blogRouter.get("/ping", (c) => {
    return c.json({ message: "pong" });
});

blogRouter.post("/create", async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json(blog, { status: 201 });
  } catch (e) {
    c.status(500);
    return c.json({ error: "error while creating blog" });
  }
});

blogRouter.put("/update", async (c) => {
  const userId = c.get("jwtPayload").id;
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json(blog);
  } catch (e) {
    c.status(500);
    return c.json({ error: "error while updating blog" });
  }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany({
            include: { author: true },
        });
        return c.json(blogs);
    } catch (e) {
        c.status(500);
        return c.json({ error: "error while fetching blogs" });
    }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!blog) {
      c.status(404);
      return c.json({ error: "Blog not found" });
    }
    return c.json(blog);
  } catch (e) {
    c.status(500);
    return c.json({ error: "error while fetching blog" });
  }
});
