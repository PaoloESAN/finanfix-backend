import { Elysia } from "elysia";
import { usuariosRoutes } from "./routes/usuarios";
import { categoriasRoutes } from "./routes/categorias";
import { cors } from "@elysiajs/cors";
import { transaccionesRoutes } from "./routes/transacciones";
import { webhooksRoutes } from "./routes/webhooks";

const app = new Elysia()
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  .onError(({ code, error, set }) => {
    console.error(`Error ${code}:`, error);

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Datos inválidos. Verifica los campos requeridos.",
      };
    }
    const errorMsg = typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : JSON.stringify(error);

    if (errorMsg.includes("Unique constraint")) {
      set.status = 409;
      return { success: false, error: "El registro ya existe." };
    }

    set.status = 500;
    return {
      success: false,
      error: "Error interno del servidor.",
    };
  })
  .get("/", () => "Hello Elysia")
  .use(usuariosRoutes)
  .use(categoriasRoutes)
  .use(transaccionesRoutes)
  .use(webhooksRoutes)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
