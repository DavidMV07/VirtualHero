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
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          role: userData.role || 'user',
          firstName: userData.firstName,
          lastName: userData.lastName
        };
      }
      return { role: 'user' };
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return { role: 'user' };
    }
  };

  const updateUserRole = async (uid, email, role = 'user', firstName = '', lastName = '') => {
    try {
      await setDoc(doc(db, 'users', uid), {
        email,
        role,
        firstName,
        lastName,
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await getUserData(currentUser.uid);
        setUser(currentUser);
        setUserRole(userData.role);
        setUserProfile({
          firstName: userData.firstName,
          lastName: userData.lastName
        });
      } else {
        setUser(null);
        setUserRole(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userRole,
    userProfile,
    loading,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 