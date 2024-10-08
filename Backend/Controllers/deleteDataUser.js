// Importamos el módulo Express para manejar las rutas
const express = require('express');
// Creamos una instancia del router de Express
const router = express.Router();
// Importamos la conexión a la base de datos
const connection = require('../coneccionBd'); // Asegúrate de que este archivo esté correctamente configurado


// Ruta DELETE para eliminar un usuario
router.delete('/:id', async (req, res) => {

    const id = req.params.id; // Obtenemos el id de los parámetros de la URL

    try {
        // Realizamos la consulta para eliminar al usuario
        const [result] = await connection.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id] 
        );

        // Verificamos si se eliminó algún usuarios
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;