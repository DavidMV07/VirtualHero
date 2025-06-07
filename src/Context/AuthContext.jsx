import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
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

  // Función para crear o actualizar el rol de un usuario
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
      {!loading && children}
    </AuthContext.Provider>
  );
}; 