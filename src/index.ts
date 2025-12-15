import { Elysia } from "elysia";
import { usuariosRoutes } from "./routes/usuarios";
import { categoriasRoutes } from "./routes/categorias";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(usuariosRoutes)
  .use(categoriasRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
