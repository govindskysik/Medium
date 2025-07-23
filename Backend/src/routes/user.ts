import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

import {signinSchema, updateUserSchema, signupSchema} from "@aroult/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const result = signupSchema.safeParse(body);
  if (!result.success) {
    c.status(400);
    return c.json({ error: "Invalid input" ,
      details : result.error.issues });
  }
  try {
    const user = await prisma.user.create({
      data: {
      email: body.email,
      password: body.password,
      name: body.name ?? undefined,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      { jwt, user },
      {
        status: 201,
      }
    );
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = signinSchema.safeParse(body);
  if (!result.success) {
    c.status(400);
    return c.json({ error: "Invalid input", details: result.error.issues });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      { jwt, user },
      {
        status: 200,
      }
    );
  } catch (e) {
    c.status(500);
    return c.json({ error: "error while signing in" });
  }
});

userRouter.put("/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const result = updateUserSchema.safeParse(body);
  if (!result.success) {
    c.status(400);
    return c.json({ error: "Invalid input", details: result.error.issues });
  }

  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }

    const userId = (await verify(authHeader, c.env.JWT_SECRET)) as { id: string };

    if (!userId || typeof userId.id !== "string") {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }

    const user = await prisma.user.update({
      where: { id: userId.id },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return c.json({
      data: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  } catch (e) {
    c.status(500);
    return c.json({ error: "error while updating user" });
  }
});
