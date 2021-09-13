import { createConnection } from "typeorm";

//Quando o server.ts startar, o método será executado automaticamente para se conectar com um db.
//(Procura pelo arquivo ormconfig.json)
createConnection();
