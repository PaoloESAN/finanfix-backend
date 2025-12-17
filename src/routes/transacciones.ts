import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const transaccionesRoutes = new Elysia({ prefix: "/transacciones" })
    .get("/", async ({ query }) => {
        if (!query.periodo) {
            return await prisma.transacciones.findMany();
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        let fechaInicio: Date;

        switch (query.periodo) {
            case "hoy":
                return await prisma.transacciones.findMany({
                    where: {
                        fecha: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()),
                    },
                });
            case "semana":
                fechaInicio = new Date(hoy);
                fechaInicio.setDate(hoy.getDate() - 7);
                break;
            case "mes":
                fechaInicio = new Date(hoy);
                fechaInicio.setMonth(hoy.getMonth() - 1);
                break;
            case "año":
                fechaInicio = new Date(hoy);
                fechaInicio.setFullYear(hoy.getFullYear() - 1);
                break;
            default:
                return await prisma.transacciones.findMany();
        }

        const transacciones = await prisma.transacciones.findMany({
            where: {
                fecha: {
                    gte: fechaInicio,
                },
            },
        });
        return transacciones;
    }, {
        query: t.Object({
            periodo: t.Optional(t.String())
        })
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
