import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth";

export const categoriasRoutes = new Elysia({ prefix: "/categorias" })
    .use(authMiddleware)
    .get("/", async ({ clerkUserId }) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { clerk_id: clerkUserId },
        });

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const categorias = await prisma.categorias.findMany({
            where: { usuario_id: usuario.id },
        });
        return categorias;
    })
    .post(
        "/",
        async ({ body, clerkUserId }) => {
            const usuario = await prisma.usuarios.findUnique({
                where: { clerk_id: clerkUserId },
            });

            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            const nuevaCategoria = await prisma.categorias.create({
                data: {
                    ...body,
                    usuario_id: usuario.id,
                },
            });
            return nuevaCategoria;
        },
        {
            body: t.Object({
                nombre: t.String(),
                es_predeterminada: t.Boolean(),
            }),
        }
    );
