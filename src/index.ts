import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/usuarios", async () => {
    const usuarios = await prisma.usuarios.findMany();
    return usuarios;
  })
  .post(
    "/usuarios",
    async ({ body }) => {
      const nuevoUsuario = await prisma.usuarios.create({
        data: body,
      });
      return nuevoUsuario;
    },
    {
      body: t.Object({
        email: t.String(),
        password_hash: t.String(),
        nombre: t.String(),
        avatar_url: t.Optional(t.String()),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
