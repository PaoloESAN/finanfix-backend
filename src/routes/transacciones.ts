import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const transaccionesRoutes = new Elysia({ prefix: "/transacciones" })
    .get("/", async () => {
        const transacciones = await prisma.transacciones.findMany();
        return transacciones;
    })
    .post(
        "/",
        async ({ body }) => {
            const nuevaTransaccion = await prisma.transacciones.create({
                data: body,
            });
            return nuevaTransaccion;
        },
        {
            body: t.Object({
                titulo: t.String(),
                usuario_id: t.Number(),
                categoria_id: t.Number(),
                monto: t.Number(),
                descripcion: t.Optional(t.String()),
                fecha: t.Date(),
            }),
        }
    );
