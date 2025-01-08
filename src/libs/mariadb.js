import mariadb from "serverless-mysql";

// Creacion de los parametros de conexion con la base de Databas.
export const conn = mariadb({
  config: {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE,
  },
});

/*
export const conn = mariadb({
  config: {
    // Variables de entorno
    DB_HOST: "bx1se9kjyjbhzzhkqgpm-mysql.services.clever-cloud.com",
    DB_USER: "umaufjjb3dpakdtj",
    DB_PASSWORD: "rxElIyQlITJyK3GLgS65",
    DB_PORT: "3306",
    DB_NAME: "bx1se9kjyjbhzzhkqgpm",
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


export const conn = mariadb({
  config: {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE,
  },
});
*/
