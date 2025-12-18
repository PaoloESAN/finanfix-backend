import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth";

const publicRoutes = new Elysia({ prefix: "/usuarios" })
    .post("/sync", async ({ body, set }) => {
        const { clerkId, email, nombre, avatar_url } = body;
        try {
            const usuarioExistente = await prisma.usuarios.findUnique({
                where: { clerk_id: clerkId }
            });
            if (usuarioExistente) {
                return {
                    message: "Usuario ya existe",
                    nuevo: false,
                    usuario: usuarioExistente
                };
            }
            const nuevoUsuario = await prisma.usuarios.create({
                data: {
                    clerk_id: clerkId,
                    email: email,
                    nombre: nombre,
                    avatar_url: avatar_url
                }
            });
            console.log("Usuario creado:", clerkId);
            return {
                message: "Usuario creado",
                nuevo: true,
                usuario: nuevoUsuario
            };
        } catch (error) {
            console.error("Error al sincronizar usuario:", error);
            set.status = 500;
            return { error: "Error al sincronizar usuario" };
        }
    }, {
        body: t.Object({
            clerkId: t.String(),
            email: t.String(),
            nombre: t.String(),
            avatar_url: t.Optional(t.String())
        })
    });

const protectedRoutes = new Elysia({ prefix: "/usuarios" })
    .use(authMiddleware)
    .get("/me", async ({ clerkUserId }) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { clerk_id: clerkUserId },
        });
        return usuario;
    })
    .get("/clerk/:clerk_id", async ({ params, clerkUserId }) => {
        if (params.clerk_id !== clerkUserId) {
            throw new Error("No autorizado");
        }

        const usuario = await prisma.usuarios.findUnique({
            where: { clerk_id: params.clerk_id },
        });
        return usuario;
    });

export const usuariosRoutes = new Elysia()
    .use(publicRoutes)
    .use(protectedRoutes);
