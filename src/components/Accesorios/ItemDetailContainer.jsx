import { useEffect, useState } from "react"
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";


const ItemDetailContainer = () => {

    // Creamos un estado llamado "item", donde vamos a guardar los datos del producto
    const [item, setItem] = useState(null);

    // Obtenemos el "id" del producto desde la URL, gracias a useParams()
    const id = useParams().id;

    // useEffect se ejecuta automáticamente cuando el componente se monta, o cuando cambia el id
    useEffect(() => {

        // Creamos una referencia al documento dentro de la colección "productos" usando el id
        const docRef = doc(db, "productos", id);

        // Usamos getDoc para pedirle a Firebase los datos de ese documento
        getDoc(docRef)
            .then((resp) => {
                // Cuando Firebase termina de traer el documento, usamos resp.data() para acceder a los datos
                // Usamos setItem para guardar los datos en el estado, incluyendo también el id del documento
                setItem({ ...resp.data(), id: resp.id });
            });

    }, [id]); // Este efecto se vuelve a ejecutar si cambia el id

    // En el return, si item tiene datos (o sea, no es null), mostramos el componente ItemDetail
    // y le pasamos los datos del producto como prop
    return (
        <div>
            {item && <ItemDetail item={item} />}
        </div>
    );
}

// Exportamos el componente para poder usarlo en otras partes del proyecto
export default ItemDetailContainer;
