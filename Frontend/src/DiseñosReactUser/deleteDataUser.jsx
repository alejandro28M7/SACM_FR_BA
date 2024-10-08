


async function deleteDataUser(id) {
    try {

        const peticion = await fetch(`http://localhost:3000/DeleteUser/${id}`
, { // Uso de backticks para interpolar el ID
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!peticion.ok) {
            throw new Error('Error en la solicitud');
        }else{
            return 'OK';
        }

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
}

export default deleteDataUser;
