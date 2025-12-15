import { Elysia } from "elysia";
import { usuariosRoutes } from "./routes/usuarios";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(usuariosRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
