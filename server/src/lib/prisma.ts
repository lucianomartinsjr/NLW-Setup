import { PrismaClient } from '@prisma/client' // importar o banco de dados

export const prisma = new PrismaClient({
  log: ['query']
}); // declarando aqui tem acesso com o banco de dados
