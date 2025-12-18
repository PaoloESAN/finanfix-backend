import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth";

export const transaccionesRoutes = new Elysia({ prefix: "/transacciones" })
    .use(authMiddleware)
    .get("/", async ({ query, clerkUserId }) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { clerk_id: clerkUserId },
        });

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (!query.periodo) {
            return await prisma.transacciones.findMany({
                where: { usuario_id: usuario.id },
            });
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        let fechaInicio: Date;

        switch (query.periodo) {
            case "hoy":
                return await prisma.transacciones.findMany({
                    where: {
                        usuario_id: usuario.id,
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
                return await prisma.transacciones.findMany({
                    where: { usuario_id: usuario.id },
                });
        }

        const transacciones = await prisma.transacciones.findMany({
            where: {
                usuario_id: usuario.id,
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
        async ({ body, clerkUserId }) => {
            const usuario = await prisma.usuarios.findUnique({
                where: { clerk_id: clerkUserId },
            });

            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            const nuevaTransaccion = await prisma.transacciones.create({
                data: {
                    ...body,
                    usuario_id: usuario.id,
                },
            });
            return nuevaTransaccion;
        },
        {
            body: t.Object({
                titulo: t.String(),
                categoria_id: t.Number(),
                monto: t.Number(),
                descripcion: t.Optional(t.String()),
                fecha: t.Date(),
            }),
        }
    );
