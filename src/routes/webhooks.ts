import { Elysia } from "elysia";
import { prisma } from "../lib/prisma";
import { Webhook } from "svix";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export const webhooksRoutes = new Elysia({ prefix: "/webhooks" })
    .post("/clerk", async ({ request, body, set }) => {
        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");

        if (!svix_id || !svix_timestamp || !svix_signature) {
            set.status = 400;
            return { error: "Faltan headers de verificación" };
        }

        const wh = new Webhook(WEBHOOK_SECRET);
        let evt: any;

        try {
            evt = wh.verify(JSON.stringify(body), {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            });
        } catch (err) {
            console.error("Webhook inválido:", err);
            set.status = 400;
            return { error: "Webhook inválido" };
        }

        const { type, data } = evt;

        console.log(`📩 Webhook recibido: ${type}`);

        if (type === "user.created") {
            await prisma.usuarios.create({
                data: {
                    clerk_id: data.id,
                    email: data.email_addresses[0]?.email_address,
                    nombre: data.first_name || data.username || "Usuario",
                }
            });
            console.log("Usuario creado:", data.id);
        }

        if (type === "user.updated") {
            await prisma.usuarios.update({
                where: { clerk_id: data.id },
                data: {
                    email: data.email_addresses[0]?.email_address,
                    nombre: data.first_name || data.username,
                }
            });
            console.log("Usuario actualizado:", data.id);
        }

        if (type === "user.deleted") {
            await prisma.usuarios.delete({
                where: { clerk_id: data.id }
            });
            console.log("Usuario eliminado:", data.id);
        }

        return { success: true };
    });