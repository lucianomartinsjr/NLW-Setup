import fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes" 


/**
 * Metodo HTTP: 
 * - Get(buscar informacao),
 * -Post(enviar informacao),
 * -Put(atualiza rercuso),
 * -Patch(atualiza recurso especifico),
 * -Delete(deletar recurso no backend)
 */

const app = fastify();

app.register(cors);
app.register(appRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server running on port 3333 : http://localhost:3333/')
})