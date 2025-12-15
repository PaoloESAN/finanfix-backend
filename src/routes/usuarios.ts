import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const usuariosRoutes = new Elysia({ prefix: "/usuarios" })
    .get("/", async () => {
        const usuarios = await prisma.usuarios.findMany();
        return usuarios;
    })
    .get("/:id", async ({ params }) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { id: Number(params.id) },
        });
        return usuario;
    })
    .post(
        "/",
        async ({ body }) => {
            const nuevoUsuario = await prisma.usuarios.create({
                data: body,
            });
            return nuevoUsuario;
        },
        {
            body: t.Object({
                email: t.String(),
                clerk_id: t.String(),
                nombre: t.String(),
                avatar_url: t.Optional(t.String()),
            }),
        }
    );
