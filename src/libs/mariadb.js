import mariadb from "serverless-mysql";

// Creacion de los parametros de conexion con la base de Databas.

export const conn = mariadb({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
});

/*
export const conn = mariadb({
  config: {
    host: "bx1se9kjyjbhzzhkqgpm-mysql.services.clever-cloud.com",
    user: "umaufjjb3dpakdtj",
    password: "rxElIyQlITJyK3GLgS65",
    port: "3306",
    database: "bx1se9kjyjbhzzhkqgpm",
  },
});


export const conn = mariadb({
  config: {
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "db_proyecto",
  },
});
*/
