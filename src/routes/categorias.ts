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
                usuario_id: t.Number(),
                nombre: t.String(),
                es_predeterminada: t.Boolean(),
            }),
        }
    );
