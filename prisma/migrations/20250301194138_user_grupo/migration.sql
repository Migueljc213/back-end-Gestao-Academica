/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioGrupo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsuarioGrupo" DROP CONSTRAINT "UsuarioGrupo_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioGrupo" DROP CONSTRAINT "UsuarioGrupo_usuarioId_fkey";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "UsuarioGrupo";

-- CreateTable
CREATE TABLE "UserGrupo" (
    "userId" INTEGER NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "UserGrupo_pkey" PRIMARY KEY ("userId","grupoId")
);

-- AddForeignKey
ALTER TABLE "UserGrupo" ADD CONSTRAINT "UserGrupo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGrupo" ADD CONSTRAINT "UserGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
