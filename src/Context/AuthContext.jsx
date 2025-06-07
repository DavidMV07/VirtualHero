// Importamos las funciones necesarias desde React para manejar contexto, estado y efectos secundarios
import { createContext, useContext, useState, useEffect } from 'react';

// Importamos la configuración de Firebase, que incluye `auth` (autenticación) y `db` (base de datos Firestore)
import { auth, db } from '../firebase/config';

// Importamos una función de Firebase Auth para escuchar los cambios de estado de autenticación del usuario
import { onAuthStateChanged } from 'firebase/auth';

// Importamos funciones de Firestore para trabajar con documentos:
// - `doc`: para hacer referencia a un documento específico
// - `getDoc`: para obtener los datos de un documento
// - `setDoc`: para establecer o crear un documento en Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Creamos un nuevo contexto de autenticación usando createContext.
// Este contexto se usará para compartir datos del usuario autenticado (y funciones relacionadas)
// a través de toda la aplicación sin necesidad de prop drilling (proceso de pasar datos a través de múltiples capas de componentes anidados en una aplicación, incluso cuando los componentes intermedios no utilizan directamente esa información).
const AuthContext = createContext();

// Creamos un custom hook llamado useAuth.
// Este hook simplifica el acceso al contexto de autenticación desde cualquier componente.
export const useAuth = () => {
  // Retornamos el valor del AuthContext usando useContext,
  // lo que permite acceder al estado de autenticación y funciones relacionadas.
  return useContext(AuthContext);
};

// Creamos un componente proveedor de contexto llamado AuthProvider.
// Este componente envolverá a la aplicación y proporcionará acceso global
// al estado de autenticación y otros datos relacionados con el usuario.
export const AuthProvider = ({ children }) => {

  // Estado para almacenar la información del usuario autenticado.
  const [user, setUser] = useState(null);

  // Estado para almacenar el rol del usuario (por ejemplo: admin, cliente, etc.).
  const [userRole, setUserRole] = useState(null);

  // Estado que indica si aún se están cargando los datos del usuario (útil para mostrar spinners, etc.).
  const [loading, setLoading] = useState(true);

  const getUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return 'user'; // rol por defecto
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      return 'user';
    }
  };

  const updateUserRole = async (uid, email, role = 'user') => {
    try {
      await setDoc(doc(db, 'users', uid), {
        email,
        role,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
    }
  };

  // Efecto para escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const role = await getUserRole(currentUser.uid);
        setUser(currentUser);
        setUserRole(role);
        localStorage.setItem("userEmail", currentUser.email);
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userRole,
    loading,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 