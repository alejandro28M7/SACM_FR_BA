// Get the client
const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
  host: process.env.HOSTDB || 'localhost',
  user: process.env.USERDB || 'root',
  password: process.env.PASSWORDDB || '12345',  // Contraseña de MySQL
  database: process.env.DB || 'loginexpress',
  port: process.env.PORTDB || '3306',
});
/**
 * EL SIGUIENTE COMANDO EXPORTA LA CONEXION DE LA BASE DE
 * DATOS A OTRO U OTROS ARCHIVOS JS 
 */
module.exports = connection; 