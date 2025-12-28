<div align="center">
  <img src="https://img.shields.io/badge/Elysia-1.2-F06292?style=for-the-badge&logo=elysia&logoColor=white" alt="Elysia"/>
  <img src="https://img.shields.io/badge/Bun-1.2-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
  <img src="https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</div>

# 🔧 FinanFix Backend

**FinanFix Backend** es la API RESTful de alto rendimiento que impulsa la aplicación FinanFix. Construida con **ElysiaJS** y ejecutándose sobre **Bun**, ofrece una velocidad excepcional y una experiencia de desarrollo moderna.

## Enlaces

- **Sitio Web:** [Visitar FinanFix](https://finanfix.vercel.app)
- **Frontend:** [Repositorio Frontend](https://github.com/PaoloESAN/finanfix)

## Tecnologías

### Core & Runtime
*   ![Elysia](https://img.shields.io/badge/Elysia-F06292?style=flat-square&logo=elysia&logoColor=white) [**ElysiaJS**](https://elysiajs.com/)
*   ![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white) [**Bun**](https://bun.sh/)
*   ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) [**TypeScript**](https://www.typescriptlang.org/)

### Base de Datos & ORM
*   ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) [**Prisma**](https://www.prisma.io/)
*   ![Neon](https://img.shields.io/badge/Neon-00E599?style=flat-square&logo=postgresql&logoColor=white) [**Neon**](https://neon.tech/)

### Integraciones & Herramientas
*   ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) [**Clerk**](https://clerk.com/)

## 🚀 Instalación y Configuración

### Prerrequisitos
- [Bun](https://bun.sh/) instalado (v1.0+)

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/finanfix-backend.git
    cd finanfix-backend
    ```

2.  **Instalar dependencias**
    ```bash
    bun install
    ```

3.  **Configurar variables de entorno**
    Crea un archivo `.env` basado en `.env.example`:
    ```env
    DATABASE_URL="postgresql://..."
    PORT=3000
    CLERK_WEBHOOK_SECRET="whsec_..."
    CLERK_SECRET_KEY="sk_..."
    FRONTEND_URL="http://localhost:5173"
    ```

4.  **Generar cliente de Prisma**
    ```bash
    bunx prisma generate
    ```

5.  **Iniciar servidor de desarrollo**
    ```bash
    bun run dev
    ```

## Despliegue

El proyecto está desplegado en **Railway**, aprovechando la compatibilidad y rendimiento de Bun en su infraestructura.

## Licencia

Este proyecto está bajo la Licencia MIT.