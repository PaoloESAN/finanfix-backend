import { Elysia } from "elysia";
import { verifyToken } from "@clerk/backend";

export const authMiddleware = new Elysia({ name: "auth" })
    .derive(async ({ headers, set }): Promise<{ clerkUserId: string; sessionId: string | undefined }> => {
        const authHeader = headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            set.status = 401;
            throw new Error("No autorizado. Token requerido.");
        }

        const token = authHeader.replace("Bearer ", "");

        try {
            const payload = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY!,
            });

            return {
                clerkUserId: payload.sub,
                sessionId: payload.sid
            };
        } catch (error) {
            console.error("Error verificando token:", error);
            set.status = 401;
            throw new Error("Token inválido o expirado.");
        }
    })
    .as("global");
