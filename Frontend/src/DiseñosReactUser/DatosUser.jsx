import { useState, useEffect } from 'react';
import '../css/estiloTablaDatos.css';
import deleteDataUser from './deleteDataUser';

function DatosUser() {
    const [usuarios, setUsuarios] = useState([]); // Estado inicial como un arreglo vacío
    const [loading, setLoading] = useState(true); // Controla el estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        fetchData(); // Llamar a la función al montar el componente
    }, []); // Solo ejecuta el efecto una vez al cargar

    const fetchData = async () => {
        try {
            const peticion = await fetch('http://localhost:3000/Data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!peticion.ok) {
                throw new Error('Error en la solicitud');
            }

            const users = await peticion.json(); // Espera a que la promesa se resuelva
            setUsuarios(users); // Actualiza el estado con los datos
        } catch (error) {
            setError(error.message); // Maneja errores si ocurre alguno
        } finally {
            setLoading(false); // Marca que la carga ha terminado
        }
    };

    const eliminarUser = async (id) => {
        try {
            const result = await deleteDataUser(id);
            if (result === 'OK') {
                alert("USUARIO ELIMINADO CON EXITO!");
                fetchData(); // Volver a llamar la función para traer los datos actualizados
            } else {
                alert('ERROR, USUARIO NO ELIMINADO');
            }
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    // Si hay un error, mostrarlo
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Mostrar mensaje de carga mientras los datos no están listos
    if (loading) {
        return <p>Cargando datos...</p>;
    }


    // Renderizar la tabla cuando los datos estén listos
    return (
        <div className="tabla-container">
            <h2>Lista de Usuarios</h2>
            
            <table className="tabla_Users">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Clave</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.clave}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                <button onClick={() => eliminarUser(usuario.id)}>Eliminar</button> {/* Botón de eliminar */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DatosUser;
