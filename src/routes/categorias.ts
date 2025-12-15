import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const categoriasRoutes = new Elysia({ prefix: "/categorias" })
    .get("/", async () => {
        const categorias = await prisma.categorias.findMany();
        return categorias;
    })
    .post(
        "/",
        async ({ body }) => {
            const nuevaCategoria = await prisma.categorias.create({
                data: body,
            });
            return nuevaCategoria;
        },
        {
            body: t.Object({
                user_id: t.String(),
                nombre: t.String(),
                es_predeterminada: t.Boolean(),
            }),
        }
    );
